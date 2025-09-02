
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Search } from "lucide-react";

export interface Destination {
  id: number;
  name: string;
  country: string;
  properties: number;
  imageUrl: string;
  description: string;
  category: string;
  urlSlug?: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "New York",
    country: "United States",
    properties: 1423,
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60",
    description: "Experience the vibrant atmosphere of the city that never sleeps.",
    category: "Urban",
    urlSlug: "new-york"
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    properties: 967,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=60",
    description: "Discover the city of love with its iconic landmarks and rich culture.",
    category: "Urban"
  },
  {
    id: 3,
    name: "London",
    country: "United Kingdom",
    properties: 1218,
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=60",
    description: "Explore the historic capital with its royal heritage and modern attractions.",
    category: "Urban"
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    properties: 891,
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=60",
    description: "Immerse yourself in the blend of tradition and cutting-edge technology.",
    category: "Urban"
  },
  {
    id: 5,
    name: "Rome",
    country: "Italy",
    properties: 753,
    imageUrl: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=500&auto=format&fit=crop&q=60",
    description: "Step back in time and enjoy Italian cuisine in the eternal city.",
    category: "Historic"
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    properties: 621,
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=60",
    description: "Enjoy the beautiful harbors, beaches, and iconic opera house.",
    category: "Coastal"
  },
  {
    id: 7,
    name: "Bali",
    country: "Indonesia",
    properties: 529,
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60",
    description: "Relax on tropical beaches and experience rich cultural traditions.",
    category: "Beach"
  },
  {
    id: 8,
    name: "Santorini",
    country: "Greece",
    properties: 415,
    imageUrl: "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=500&auto=format&fit=crop&q=60",
    description: "White-washed buildings, blue domes, and stunning sunset views.",
    category: "Island"
  },
  {
    id: 9,
    name: "Swiss Alps",
    country: "Switzerland",
    properties: 382,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=60",
    description: "Experience breathtaking mountain landscapes and charming villages.",
    category: "Mountain"
  },
  {
    id: 10,
    name: "Barcelona",
    country: "Spain",
    properties: 678,
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&auto=format&fit=crop&q=60",
    description: "Enjoy the unique architecture, beaches, and vibrant atmosphere.",
    category: "Urban"
  },
  {
    id: 11,
    name: "Kyoto",
    country: "Japan",
    properties: 325,
    imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=60",
    description: "Ancient temples, traditional gardens, and authentic Japanese culture.",
    category: "Historic"
  },
  {
    id: 12,
    name: "Serengeti",
    country: "Tanzania",
    properties: 106,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&auto=format&fit=crop&q=60",
    description: "Safari adventures in one of Africa's most famous national parks.",
    category: "Wildlife"
  }
];

// Available categories based on our destinations data
const categories = ["All", ...new Set(destinations.map(dest => dest.category))];

const ExploreDestinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Filter destinations based on search term and selected category
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-luxury-emerald to-luxury-gold bg-clip-text text-transparent">Sacred Destinations</h1>
          <p className="text-luxury-taupe text-lg">Discover spiritual places around the world for your sacred journey</p>
        </div>
        
        {/* Search and Filter */}
        <div className="glass border-2 border-luxury-emerald/20 rounded-2xl shadow-xl p-6 mb-8 bg-gradient-to-br from-white/95 to-safety-sky/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-taupe h-4 w-4" />
              <Input 
                className="pl-10 bg-white/95 border-luxury-taupe/30 focus:border-luxury-emerald focus:ring-2 focus:ring-luxury-emerald/20 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02]" 
                placeholder="Search sacred destinations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-luxury-emerald hover:bg-luxury-navy text-white shadow-lg" 
                    : "border-luxury-taupe/30 text-luxury-charcoal hover:border-luxury-emerald hover:text-luxury-emerald"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <Card 
                key={destination.id} 
                className="overflow-hidden hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 cursor-pointer glass-card border-luxury-taupe/20 bg-gradient-to-br from-white to-safety-sky/10 shadow-lg hover:shadow-2xl group"
                onClick={() => navigate(destination.urlSlug ? `/destination/${destination.urlSlug}` : "/see-availability")}
              >
                <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-charcoal/80 to-transparent p-4">
                      <span className="text-white text-sm font-medium px-3 py-1 bg-luxury-emerald/90 rounded-full shadow-lg">
                        {destination.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-luxury-charcoal group-hover:text-luxury-emerald transition-colors">{destination.name}</h3>
                      <span className="text-sm text-luxury-taupe bg-safety-sky/30 px-2 py-1 rounded-full">{destination.properties} sacred stays</span>
                    </div>
                    <div className="flex items-center text-luxury-taupe text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1 text-luxury-emerald" />
                      {destination.country}
                    </div>
                    <p className="text-sm text-luxury-taupe mb-4 leading-relaxed">{destination.description}</p>
                    <Button 
                      className="w-full bg-gradient-to-r from-luxury-emerald to-luxury-gold hover:from-luxury-gold hover:to-safety-sage text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(destination.urlSlug ? `/destination/${destination.urlSlug}` : "/see-availability");
                      }}
                    >
                      <Landmark className="h-4 w-4 mr-2" />
                      {destination.urlSlug ? "Explore Sacred Place" : "View Sacred Stays"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground text-lg">No destinations found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploreDestinations;
