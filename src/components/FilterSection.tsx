
import React from 'react';
import { MapPin, DollarSign, Star, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterSectionProps {
  categories: string[];
  priceRanges: string[];
  distances: string[];
  ratings: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (value: string) => void;
  selectedDistance: string;
  setSelectedDistance: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  hideDate?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  priceRanges,
  distances,
  ratings,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedDistance,
  setSelectedDistance,
  selectedRating,
  setSelectedRating,
  hideDate = false,
}) => {
  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSelectedDistance("All");
    setSelectedRating("All");
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950"
        >
          Clear All
        </Button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            Category
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            Price
          </label>
          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            Distance
          </label>
          <Select value={selectedDistance} onValueChange={setSelectedDistance}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {distances.map((distance) => (
                <SelectItem key={distance} value={distance}>
                  {distance}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            Rating
          </label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
