
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Star, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import EventCard from '@/components/EventCard';
import FilterSection from '@/components/FilterSection';

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Summer Jazz Festival",
    category: "Music",
    date: "2025-07-15",
    time: "7:00 PM",
    location: "Central Park",
    distance: 2.3,
    price: 45,
    rating: 4.8,
    attendees: 450,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    description: "An evening of smooth jazz under the stars with renowned local and international artists."
  },
  {
    id: 2,
    title: "Food Truck Rally",
    category: "Food",
    date: "2025-07-12",
    time: "11:00 AM",
    location: "Downtown Square",
    distance: 1.8,
    price: 0,
    rating: 4.6,
    attendees: 320,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop",
    description: "Delicious street food from 20+ food trucks, live music, and family activities."
  },
  {
    id: 3,
    title: "Digital Art Exhibition",
    category: "Arts",
    date: "2025-07-20",
    time: "2:00 PM",
    location: "Modern Art Gallery",
    distance: 4.2,
    price: 25,
    rating: 4.9,
    attendees: 180,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    description: "Immersive digital art installations by contemporary artists exploring technology and creativity."
  },
  {
    id: 4,
    title: "5K Charity Run",
    category: "Sports",
    date: "2025-07-18",
    time: "8:00 AM",
    location: "Riverside Trail",
    distance: 3.1,
    price: 15,
    rating: 4.4,
    attendees: 280,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    description: "Join us for a morning run supporting local children's charities. All fitness levels welcome!"
  },
  {
    id: 5,
    title: "Tech Startup Meetup",
    category: "Business",
    date: "2025-07-22",
    time: "6:30 PM",
    location: "Innovation Hub",
    distance: 5.7,
    price: 0,
    rating: 4.7,
    attendees: 150,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    description: "Network with entrepreneurs, investors, and tech enthusiasts. Featuring startup pitches and panel discussions."
  },
  {
    id: 6,
    title: "Wine Tasting Evening",
    category: "Food",
    date: "2025-07-25",
    time: "7:30 PM",
    location: "Vintage Cellars",
    distance: 6.2,
    price: 60,
    rating: 4.9,
    attendees: 80,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=250&fit=crop",
    description: "Curated selection of premium wines paired with artisanal cheeses and expert sommelier guidance."
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
  const [selectedDate, setSelectedDate] = useState("");

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
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

      // Date filter
      if (selectedDate && event.date !== selectedDate) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedDistance, selectedRating, selectedDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Local Events Directory
            </h1>
            <p className="text-gray-600 text-lg">Discover amazing events happening near you</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search events, keywords, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-orange-200 focus:border-orange-400 focus:ring-orange-200"
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
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredEvents.length} Events Found
          </h2>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {selectedCategory}
              </Badge>
            )}
            {selectedPriceRange !== "All" && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {selectedPriceRange}
              </Badge>
            )}
            {selectedDistance !== "All" && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedDistance}
              </Badge>
            )}
            {selectedRating !== "All" && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {selectedRating}
              </Badge>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more events</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
