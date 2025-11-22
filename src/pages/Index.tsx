import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  time: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [saveHistory, setSaveHistory] = useState(true);
  const [searchEngine, setSearchEngine] = useState<'google' | 'yandex'>('google');
  const [liquidGlass, setLiquidGlass] = useState(true);
  const [customBackground, setCustomBackground] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = searchEngine === 'google' 
        ? `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
        : `https://yandex.ru/search/?text=${encodeURIComponent(searchQuery)}`;
      
      if (saveHistory) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          title: searchQuery,
          url: searchEngine === 'google' 
            ? `google.com/search?q=${encodeURIComponent(searchQuery)}`
            : `yandex.ru/search/?text=${encodeURIComponent(searchQuery)}`,
          time: "Только что"
        };
        setHistoryItems([newHistoryItem, ...historyItems]);
      }
      
      window.open(searchUrl, '_blank');
      setSearchQuery("");
    }
  };

  const clearHistory = () => {
    setHistoryItems([]);
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden"
      style={customBackground ? { 
        backgroundImage: `url(${customBackground})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      } : {}}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_50%)]" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="glass-effect rounded-2xl p-2 mb-8 inline-flex">
            <TabsList className="bg-transparent">
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon name="Clock" size={18} className="mr-2" />
                История
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon name="Settings" size={18} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home" className="animate-fade-in">
            <div className="max-w-3xl mx-auto mt-20">
              <div className="text-center mb-12">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MKbrowser
                </h1>
              </div>

              <form onSubmit={handleSearch} className="mb-12">
                <div className={`${liquidGlass ? 'glass-effect glass-hover' : 'bg-white/10 hover:bg-white/15'} rounded-full p-2 flex items-center gap-3 shadow-2xl transition-all duration-300`}>
                  <Icon name="Search" size={24} className="ml-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск в MKbrowser или введите URL"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/80">
                    <Icon name="ArrowRight" size={20} />
                  </Button>
                </div>
              </form>

              <div className={`${liquidGlass ? 'glass-effect' : 'bg-white/10'} rounded-2xl p-6 transition-all duration-300`}>
                <h2 className="text-xl font-bold mb-4">Недавние запросы</h2>
                {historyItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Icon name="Search" size={48} className="mb-4 opacity-50" />
                    <p className="text-base">Нет недавних запросов</p>
                    <p className="text-sm">Ваши последние поисковые запросы появятся здесь</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {historyItems.slice(0, 5).map((item) => (
                      <Card
                        key={item.id}
                        className={`${liquidGlass ? 'glass-effect glass-hover' : 'bg-white/10 hover:bg-white/15'} border-white/10 p-4 cursor-pointer transition-all duration-300`}
                        onClick={() => window.open(`https://${item.url}`, '_blank')}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Icon name="Clock" size={20} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{item.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{item.time}</p>
                          </div>
                          <Icon name="ExternalLink" size={16} className="text-muted-foreground flex-shrink-0" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className={`${liquidGlass ? 'glass-effect' : 'bg-white/10'} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">История посещений</h2>
                  <Button variant="outline" className="glass-effect glass-hover border-white/10" onClick={clearHistory}>
                    <Icon name="Trash2" size={18} className="mr-2" />
                    Очистить историю
                  </Button>
                </div>
                
                <ScrollArea className="h-[500px]">
                  {historyItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <Icon name="Clock" size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">История пуста</p>
                      <p className="text-sm">Начните поиск, чтобы увидеть историю</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {historyItems.map((item) => (
                        <Card
                          key={item.id}
                          className={`${liquidGlass ? 'glass-effect glass-hover' : 'bg-white/10 hover:bg-white/15'} border-white/10 p-4 cursor-pointer transition-all duration-300`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Icon name="Globe" size={20} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{item.title}</h3>
                              <p className="text-sm text-muted-foreground truncate">{item.url}</p>
                              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                            </div>
                            <Icon name="ExternalLink" size={16} className="text-muted-foreground flex-shrink-0" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className={`${liquidGlass ? 'glass-effect' : 'bg-white/10'} rounded-2xl p-6 transition-all duration-300`}>
                <h2 className="text-2xl font-bold mb-6">Настройки браузера</h2>
                
                <div className="space-y-6">
                  <Card className={`${liquidGlass ? 'glass-effect' : 'bg-white/5'} border-white/10 p-5 transition-all duration-300`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Сохранять историю</h3>
                        <p className="text-sm text-muted-foreground">Автоматически сохранять поисковые запросы</p>
                      </div>
                      <button
                        onClick={() => setSaveHistory(!saveHistory)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                          saveHistory ? 'bg-primary' : 'bg-white/10'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          saveHistory ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </Card>

                  <Card className={`${liquidGlass ? 'glass-effect' : 'bg-white/5'} border-white/10 p-5 transition-all duration-300`}>
                    <div>
                      <h3 className="font-medium mb-3">Поисковая система</h3>
                      <p className="text-sm text-muted-foreground mb-4">Выберите основной поисковик</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSearchEngine('google')}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                            searchEngine === 'google'
                              ? 'border-primary bg-primary/20'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <Icon name="Search" size={20} className="text-white" />
                            </div>
                            <span className="font-medium">Google</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setSearchEngine('yandex')}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                            searchEngine === 'yandex'
                              ? 'border-primary bg-primary/20'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                              <span className="text-white font-bold">Я</span>
                            </div>
                            <span className="font-medium">Яндекс</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </Card>

                  <Card className={`${liquidGlass ? 'glass-effect' : 'bg-white/5'} border-white/10 p-5 transition-all duration-300`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Эффект жидкого стекла</h3>
                        <p className="text-sm text-muted-foreground">Размытие и прозрачность элементов</p>
                      </div>
                      <button
                        onClick={() => setLiquidGlass(!liquidGlass)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                          liquidGlass ? 'bg-primary' : 'bg-white/10'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          liquidGlass ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </Card>

                  <Card className={`${liquidGlass ? 'glass-effect' : 'bg-white/5'} border-white/10 p-5 transition-all duration-300`}>
                    <div>
                      <h3 className="font-medium mb-3">Фоновое изображение</h3>
                      <p className="text-sm text-muted-foreground mb-4">Установите собственные обои для браузера</p>
                      <div className="flex gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundUpload}
                          className="hidden"
                          id="background-upload"
                        />
                        <label
                          htmlFor="background-upload"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 text-center">
                            <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Загрузить изображение</p>
                          </div>
                        </label>
                        {customBackground && (
                          <Button
                            variant="outline"
                            onClick={() => setCustomBackground("")}
                            className="border-white/10"
                          >
                            <Icon name="X" size={18} className="mr-2" />
                            Сбросить
                          </Button>
                        )}
                      </div>
                      {customBackground && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                          <img src={customBackground} alt="Custom background" className="w-full h-32 object-cover" />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
