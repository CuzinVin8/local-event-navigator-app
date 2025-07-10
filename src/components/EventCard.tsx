
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
      Music: 'bg-purple-100 text-purple-700',
      Food: 'bg-orange-100 text-orange-700',
      Arts: 'bg-pink-100 text-pink-700',
      Sports: 'bg-blue-100 text-blue-700',
      Business: 'bg-green-100 text-green-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
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
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-3 text-orange-500" />
            <span className="text-sm font-medium">{formatDate(event.date)}</span>
            <span className="text-sm text-gray-500 ml-2">at {event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-blue-500" />
            <span className="text-sm">{event.location}</span>
            <span className="text-sm text-gray-500 ml-2">({event.distance} mi)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">{event.attendees} going</span>
            </div>
            
            <div className="flex items-center font-semibold">
              {event.price === 0 ? (
                <span className="text-green-600 font-bold">FREE</span>
              ) : (
                <div className="flex items-center text-gray-800">
                  <DollarSign className="h-4 w-4" />
                  <span>{event.price}</span>
                </div>
              )}
            </div>
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
