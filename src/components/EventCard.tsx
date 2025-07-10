
import React from 'react';
import { MapPin, Calendar, Star, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  distance: number;
  price: number;
  rating: number;
  attendees: number;
  image: string;
  description: string;
  tags: string[];
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      Arts: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      Sports: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      Business: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  const getTagColor = (tag: string) => {
    const tagColors = {
      "Outdoor": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
      "Indoor": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      "Free": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      "Family Friendly": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      "21+": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      "Premium": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      "Live Music": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      "Food Available": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      "Interactive": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
      "Tech": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      "Charity": "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
      "Early Morning": "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
      "All Levels": "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
      "Networking": "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
    };
    return tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div className="relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-orange-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-3 text-orange-500" />
            <span className="text-sm font-medium">{formatDate(event.date)}</span>
            <span className="text-sm text-muted-foreground ml-2">at {event.time}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-3 text-blue-500" />
            <span className="text-sm">{event.location}</span>
            <span className="text-sm text-muted-foreground ml-2">({event.distance} mi)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">{event.attendees} going</span>
            </div>
            
            <div className="flex items-center font-semibold">
              {event.price === 0 ? (
                <span className="text-green-600 font-bold">FREE</span>
              ) : (
                <div className="flex items-center text-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{event.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Color-coded tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {event.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`text-xs ${getTagColor(tag)}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
