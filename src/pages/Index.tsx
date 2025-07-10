import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, DollarSign, ChevronLeft, ChevronRight, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import FilterSection from '@/components/FilterSection';

// Helper function to get weekend dates
const getWeekendDates = (weekOffset = 0) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToFriday = (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysToFriday + (weekOffset * 7));
  
  const saturday = new Date(nextFriday);
  saturday.setDate(nextFriday.getDate() + 1);
  
  const sunday = new Date(nextFriday);
  sunday.setDate(nextFriday.getDate() + 2);
  
  return {
    friday: nextFriday.toISOString().split('T')[0],
    saturday: saturday.toISOString().split('T')[0],
    sunday: sunday.toISOString().split('T')[0]
  };
};

// Mock event data - weekend focused
const mockEvents = [
  {
    id: 1,
    title: "Summer Jazz Festival",
    category: "Music",
    date: getWeekendDates().friday,
    time: "7:00 PM",
    location: "Central Park",
    distance: 2.3,
    price: 45,
    rating: 4.8,
    attendees: 450,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    description: "An evening of smooth jazz under the stars with renowned local and international artists.",
    tags: ["Outdoor", "Live Music", "Food Available"]
  },
  {
    id: 2,
    title: "Food Truck Rally",
    category: "Food",
    date: getWeekendDates().saturday,
    time: "11:00 AM",
    location: "Downtown Square",
    distance: 1.8,
    price: 0,
    rating: 4.6,
    attendees: 320,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
    description: "Delicious street food from 20+ food trucks, live music, and family activities.",
    tags: ["Family Friendly", "Free", "Outdoor"]
  },
  {
    id: 3,
    title: "Digital Art Exhibition",
    category: "Arts",
    date: getWeekendDates().sunday,
    time: "2:00 PM",
    location: "Modern Art Gallery",
    distance: 4.2,
    price: 25,
    rating: 4.9,
    attendees: 180,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    description: "Immersive digital art installations by contemporary artists exploring technology and creativity.",
    tags: ["Indoor", "Interactive", "Tech"]
  },
  {
    id: 4,
    title: "5K Charity Run",
    category: "Sports",
    date: getWeekendDates().saturday,
    time: "8:00 AM",
    location: "Riverside Trail",
    distance: 3.1,
    price: 15,
    rating: 4.4,
    attendees: 280,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    description: "Join us for a morning run supporting local children's charities. All fitness levels welcome!",
    tags: ["Charity", "Early Morning", "All Levels"]
  },
  {
    id: 5,
    title: "Tech Startup Meetup",
    category: "Business",
    date: getWeekendDates().friday,
    time: "6:30 PM",
    location: "Innovation Hub",
    distance: 5.7,
    price: 0,
    rating: 4.7,
    attendees: 150,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    description: "Network with entrepreneurs, investors, and tech enthusiasts. Featuring startup pitches and panel discussions.",
    tags: ["Networking", "Free", "Indoor"]
  },
  {
    id: 6,
    title: "Wine Tasting Evening",
    category: "Food",
    date: getWeekendDates().sunday,
    time: "7:30 PM",
    location: "Vintage Cellars",
    distance: 6.2,
    price: 60,
    rating: 4.9,
    attendees: 80,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=250&fit=crop",
    description: "Curated selection of premium wines paired with artisanal cheeses and expert sommelier guidance.",
    tags: ["Premium", "21+", "Indoor"]
  }
];

const categories = ["All", "Music", "Food", "Arts", "Sports", "Business"];
const priceRanges = ["All", "Free", "$1-25", "$26-50", "$51-100", "$100+"];
const distances = ["All", "Under 2 miles", "2-5 miles", "5-10 miles", "10+ miles"];
const ratings = ["All", "4.5+ stars", "4.0+ stars", "3.5+ stars", "3.0+ stars"];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [weekOffset, setWeekOffset] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDay, setActiveDay] = useState("friday");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const weekendDates = getWeekendDates(weekOffset);

  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Only show events for the current weekend
      const eventDate = event.date;
      const isCurrentWeekend = Object.values(weekendDates).includes(eventDate);
      if (!isCurrentWeekend) return false;

      // Search filter
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== "All") {
        if (selectedPriceRange === "Free" && event.price !== 0) return false;
        if (selectedPriceRange === "$1-25" && (event.price < 1 || event.price > 25)) return false;
        if (selectedPriceRange === "$26-50" && (event.price < 26 || event.price > 50)) return false;
        if (selectedPriceRange === "$51-100" && (event.price < 51 || event.price > 100)) return false;
        if (selectedPriceRange === "$100+" && event.price <= 100) return false;
      }

      // Distance filter
      if (selectedDistance !== "All") {
        if (selectedDistance === "Under 2 miles" && event.distance >= 2) return false;
        if (selectedDistance === "2-5 miles" && (event.distance < 2 || event.distance > 5)) return false;
        if (selectedDistance === "5-10 miles" && (event.distance < 5 || event.distance > 10)) return false;
        if (selectedDistance === "10+ miles" && event.distance <= 10) return false;
      }

      // Rating filter
      if (selectedRating !== "All") {
        const minRating = parseFloat(selectedRating.split('+')[0]);
        if (event.rating < minRating) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedDistance, selectedRating, weekendDates]);

  const getEventsForDay = (day: string) => {
    const dayDate = weekendDates[day as keyof typeof weekendDates];
    return filteredEvents.filter(event => event.date === dayDate);
  };

  const formatWeekendDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDayTheme = (day: string) => {
    const themes = {
      friday: "from-blue-500 to-purple-600",
      saturday: "from-orange-500 to-red-600", 
      sunday: "from-green-500 to-teal-600"
    };
    return themes[day as keyof typeof themes];
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Weekend Events Directory
              </h1>
              <p className="text-muted-foreground text-lg">Discover amazing events happening this weekend</p>
            </div>
            
            {/* Auth and Dark mode controls */}
            <div className="flex items-center space-x-4">
              {/* User menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
              
              {/* Dark mode toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Weekend Navigation */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setWeekOffset(weekOffset - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Weekend
            </Button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {formatWeekendDate(weekendDates.friday)} - {formatWeekendDate(weekendDates.sunday)}
              </h2>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setWeekOffset(weekOffset + 1)}
            >
              Next Weekend
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search events, keywords, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Filter Section */}
          <FilterSection
            categories={categories}
            priceRanges={priceRanges}
            distances={distances}
            ratings={ratings}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            hideDate={true}
          />
        </div>
      </div>

      {/* Weekend Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="friday" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Friday {formatWeekendDate(weekendDates.friday)}
            </TabsTrigger>
            <TabsTrigger 
              value="saturday"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Saturday {formatWeekendDate(weekendDates.saturday)}
            </TabsTrigger>
            <TabsTrigger 
              value="sunday"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white"
            >
              Sunday {formatWeekendDate(weekendDates.sunday)}
            </TabsTrigger>
          </TabsList>

          {/* Friday Events */}
          <TabsContent value="friday" className="space-y-6">
            <div className={`bg-gradient-to-r ${getDayTheme('friday')} rounded-xl p-6 text-white`}>
              <h2 className="text-2xl font-bold mb-2">Friday Night Events</h2>
              <p className="opacity-90">Kick off your weekend with these amazing Friday events</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEventsForDay('friday').map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {getEventsForDay('friday').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No Friday events found matching your filters</p>
              </div>
            )}
          </TabsContent>

          {/* Saturday Events */}
          <TabsContent value="saturday" className="space-y-6">
            <div className={`bg-gradient-to-r ${getDayTheme('saturday')} rounded-xl p-6 text-white`}>
              <h2 className="text-2xl font-bold mb-2">Saturday Adventures</h2>
              <p className="opacity-90">Make the most of your Saturday with these exciting events</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEventsForDay('saturday').map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {getEventsForDay('saturday').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No Saturday events found matching your filters</p>
              </div>
            )}
          </TabsContent>

          {/* Sunday Events */}
          <TabsContent value="sunday" className="space-y-6">
            <div className={`bg-gradient-to-r ${getDayTheme('sunday')} rounded-xl p-6 text-white`}>
              <h2 className="text-2xl font-bold mb-2">Sunday Relaxation</h2>
              <p className="opacity-90">Wind down your weekend with these perfect Sunday events</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEventsForDay('sunday').map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {getEventsForDay('sunday').length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No Sunday events found matching your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          {selectedCategory !== "All" && (
            <Badge variant="secondary">
              {selectedCategory}
            </Badge>
          )}
          {selectedPriceRange !== "All" && (
            <Badge variant="secondary">
              {selectedPriceRange}
            </Badge>
          )}
          {selectedDistance !== "All" && (
            <Badge variant="secondary">
              {selectedDistance}
            </Badge>
          )}
          {selectedRating !== "All" && (
            <Badge variant="secondary">
              {selectedRating}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
