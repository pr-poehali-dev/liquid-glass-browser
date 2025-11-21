import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuickLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

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

  const quickLinks: QuickLink[] = [
    { id: "1", name: "YouTube", url: "youtube.com", icon: "Youtube" },
    { id: "2", name: "Gmail", url: "gmail.com", icon: "Mail" },
    { id: "3", name: "Drive", url: "drive.google.com", icon: "HardDrive" },
    { id: "4", name: "Maps", url: "maps.google.com", icon: "Map" },
    { id: "5", name: "Photos", url: "photos.google.com", icon: "Image" },
    { id: "6", name: "Calendar", url: "calendar.google.com", icon: "Calendar" },
    { id: "7", name: "Docs", url: "docs.google.com", icon: "FileText" },
    { id: "8", name: "Meet", url: "meet.google.com", icon: "Video" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: searchQuery,
        url: `google.com/search?q=${encodeURIComponent(searchQuery)}`,
        time: "Только что"
      };
      setHistoryItems([newHistoryItem, ...historyItems]);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
      setSearchQuery("");
    }
  };

  const clearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] relative overflow-hidden">
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
                <div className="glass-effect rounded-full p-2 flex items-center gap-3 glass-hover shadow-2xl">
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

              <div className="grid grid-cols-4 gap-4">
                {quickLinks.map((link) => (
                  <Card
                    key={link.id}
                    className="glass-effect glass-hover cursor-pointer p-6 flex flex-col items-center justify-center gap-3 border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Icon name={link.icon as any} size={24} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{link.name}</span>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-2xl p-6">
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
                          className="glass-effect glass-hover border-white/10 p-4 cursor-pointer"
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
