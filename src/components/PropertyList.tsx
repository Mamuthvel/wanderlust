
import { useState } from "react";
import PropertyCard, { PropertyProps } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const properties: PropertyProps[] = [
  {
    id: 1,
    name: "Grand Hotel Plaza",
    type: "Hotel",
    location: "Downtown",
    rating: 8.9,
    reviews: 1243,
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
    featured: true,
    distanceFromCenter: "0.5 miles"
  },
  {
    id: 2,
    name: "Sunset Beach Resort",
    type: "Resort",
    location: "Beachfront",
    rating: 9.2,
    reviews: 875,
    price: 329,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60",
    distanceFromCenter: "2.1 miles"
  },
  {
    id: 3,
    name: "Urban Loft Apartments",
    type: "Apartment",
    location: "Midtown",
    rating: 8.5,
    reviews: 642,
    price: 149,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60",
    distanceFromCenter: "1.0 miles"
  },
  {
    id: 4,
    name: "Mountain View Cabin",
    type: "Cabin",
    location: "Countryside",
    rating: 9.0,
    reviews: 312,
    price: 179,
    imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500&auto=format&fit=crop&q=60",
    featured: true,
    distanceFromCenter: "4.5 miles"
  },
  {
    id: 5,
    name: "City Center Hostel",
    type: "Hostel",
    location: "Downtown",
    rating: 7.8,
    reviews: 523,
    price: 49,
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=60",
    distanceFromCenter: "0.2 miles"
  }
];

const PropertyList = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [sortOption, setSortOption] = useState("recommended");

  const handleFilter = () => {
    let filtered = [...properties];
    
    // Filter by price
    filtered = filtered.filter(
      (property) => property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Filter by property type
    if (selectedPropertyType) {
      filtered = filtered.filter(
        (property) => property.type.toLowerCase() === selectedPropertyType.toLowerCase()
      );
    }
    
    // Sort
    if (sortOption === "price_low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Available properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter sidebar */}
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="font-medium text-lg mb-4">Filter by:</h3>
            
            <div className="space-y-6">
              {/* Price range filter */}
              <div>
                <Label className="mb-2 block">Price range per night</Label>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="border rounded-md px-2 py-1">
                    ${priceRange[0]}
                  </div>
                  <div className="border rounded-md px-2 py-1">
                    ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Property type filter */}
              <div>
                <Label htmlFor="propertyType" className="mb-2 block">Property type</Label>
                <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleFilter} className="w-full">
                Apply filters
              </Button>
            </div>
          </div>

          {/* Properties list */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm">
                {filteredProperties.length} properties found
              </p>
              <div className="flex items-center">
                <Label htmlFor="sortBy" className="mr-2 text-sm">Sort by:</Label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger id="sortBy" className="w-[180px]">
                    <SelectValue placeholder="Recommended" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price_low">Price (lowest first)</SelectItem>
                    <SelectItem value="price_high">Price (highest first)</SelectItem>
                    <SelectItem value="rating">Rating (highest first)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xl">No properties found matching your criteria</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyList;
