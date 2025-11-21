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

interface Download {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed';
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  folder: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

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

  const history: HistoryItem[] = [
    { id: "1", title: "React Documentation", url: "react.dev", time: "2 минуты назад" },
    { id: "2", title: "GitHub - poehali.dev", url: "github.com/poehali", time: "15 минут назад" },
    { id: "3", title: "Stack Overflow - TypeScript", url: "stackoverflow.com", time: "1 час назад" },
    { id: "4", title: "MDN Web Docs", url: "developer.mozilla.org", time: "2 часа назад" },
    { id: "5", title: "Tailwind CSS", url: "tailwindcss.com", time: "3 часа назад" },
  ];

  const downloads: Download[] = [
    { id: "1", name: "project-files.zip", size: "45.2 MB", progress: 100, status: "completed" },
    { id: "2", name: "image-design.png", size: "2.8 MB", progress: 65, status: "downloading" },
    { id: "3", name: "video-tutorial.mp4", size: "128.5 MB", progress: 100, status: "completed" },
  ];

  const bookmarks: Bookmark[] = [
    { id: "1", title: "poehali.dev", url: "poehali.dev", folder: "Работа" },
    { id: "2", title: "ChatGPT", url: "chat.openai.com", folder: "AI Инструменты" },
    { id: "3", title: "Figma", url: "figma.com", folder: "Дизайн" },
    { id: "4", title: "GitHub", url: "github.com", folder: "Разработка" },
    { id: "5", title: "Vercel", url: "vercel.com", folder: "Деплой" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#2D1B4E] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
      
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
                value="downloads"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Загрузки
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon name="Bookmark" size={18} className="mr-2" />
                Закладки
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
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Google
                </h1>
              </div>

              <form onSubmit={handleSearch} className="mb-12">
                <div className="glass-effect rounded-full p-2 flex items-center gap-3 glass-hover shadow-2xl">
                  <Icon name="Search" size={24} className="ml-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск в Google или введите URL"
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
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
                  <Button variant="outline" className="glass-effect glass-hover border-white/10">
                    <Icon name="Trash2" size={18} className="mr-2" />
                    Очистить историю
                  </Button>
                </div>
                
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {history.map((item) => (
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
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Загрузки</h2>
                
                <div className="space-y-4">
                  {downloads.map((download) => (
                    <Card
                      key={download.id}
                      className="glass-effect border-white/10 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="FileDown" size={24} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{download.name}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                style={{ width: `${download.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{download.progress}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{download.size}</p>
                        </div>
                        {download.status === 'completed' && (
                          <Icon name="CheckCircle" size={20} className="text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Закладки</h2>
                  <Button className="bg-primary hover:bg-primary/80">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить закладку
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {bookmarks.map((bookmark) => (
                    <Card
                      key={bookmark.id}
                      className="glass-effect glass-hover border-white/10 p-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon name="Star" size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{bookmark.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                            {bookmark.folder}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="glass-effect rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Настройки браузера</h2>
                
                <div className="space-y-6">
                  <Card className="glass-effect border-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Темная тема</h3>
                        <p className="text-sm text-muted-foreground">Использовать темную тему оформления</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-effect border-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Автозаполнение</h3>
                        <p className="text-sm text-muted-foreground">Автоматически заполнять формы</p>
                      </div>
                      <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-effect border-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Уведомления</h3>
                        <p className="text-sm text-muted-foreground">Получать уведомления от сайтов</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-effect border-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Безопасный просмотр</h3>
                        <p className="text-sm text-muted-foreground">Защита от опасных сайтов</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-effect border-white/10 p-5 cursor-pointer glass-hover">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Очистить данные</h3>
                        <p className="text-sm text-muted-foreground">Удалить историю, кэш и cookies</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </Card>

                  <Card className="glass-effect border-white/10 p-5 cursor-pointer glass-hover">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Пароли</h3>
                        <p className="text-sm text-muted-foreground">Управление сохраненными паролями</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
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
