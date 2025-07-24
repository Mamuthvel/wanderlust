
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Landmark, ArrowLeft } from "lucide-react";

export interface DestinationData {
  id: number;
  name: string;
  country: string;
  properties: number;
  imageUrl: string;
  urlSlug?:string;
  description: string;
  category: string;
  highlights?: string[];
  longDescription?: string;
}

const destinationsData: Record<string, DestinationData> = {
  "new-york": {
    id: 1,
    name: "New York",
    country: "United States",
    properties: 1423,
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60",
    description: "Experience the vibrant atmosphere of the city that never sleeps.",
    category: "Urban",
    highlights: [
      "Times Square",
      "Central Park",
      "Empire State Building",
      "Statue of Liberty",
      "Metropolitan Museum of Art"
    ],
    longDescription: "New York City is the most populous city in the United States, and a global center for finance, culture, arts, fashion, and entertainment. Known as 'The Big Apple', it's home to iconic landmarks like Times Square, the Empire State Building, and Central Park. The city's diverse neighborhoods offer unique experiences, from the trendy streets of SoHo to the cultural richness of Chinatown. With world-class museums, Broadway shows, and an incredible food scene, New York is truly a city that never sleeps and offers endless opportunities for exploration and discovery."
  }
};

const DestinationDetail = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  
  // Find the destination data based on the URL parameter
  const destination = destinationId ? destinationsData[destinationId] : undefined;
  
  // If destination is not found, show a message
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate("/explore-destinations")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground">
              The destination you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => navigate("/explore-destinations")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Destinations
        </Button>
        
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full rounded-lg overflow-hidden mb-6">
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <span className="text-white text-sm font-medium px-3 py-1 bg-booking-blue/90 rounded inline-block mb-4">
              {destination.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center text-white/90 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {destination.country}
            </div>
            <p className="text-white/80 text-lg max-w-2xl">{destination.description}</p>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-muted-foreground mb-6">{destination.longDescription}</p>
                
                <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {destination.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <Landmark className="h-4 w-4 mr-2 text-booking-blue" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Photo Gallery - Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden">
                      <img 
                        src={`https://source.unsplash.com/random/300x300?nyc,${i}`} 
                        alt={`${destination.name} scene ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Available Properties</h2>
                <p className="text-3xl font-bold text-booking-blue mb-3">{destination.properties}</p>
                <p className="text-muted-foreground mb-6">accommodations available in {destination.name}</p>
                
                <Button 
                  className="w-full bg-booking-blue hover:bg-booking-darkBlue mb-4"
                  onClick={() => navigate("/see-availability")}
                >
                  <Landmark className="h-4 w-4 mr-2" />
                  Browse Properties
                </Button>
                
                <div className="bg-booking-lightBlue rounded-lg p-4">
                  <h3 className="font-medium mb-2">Why book with WanderStay?</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="bg-booking-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                      Best price guarantee
                    </li>
                    <li className="flex items-start">
                      <span className="bg-booking-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                      Free cancellation on most rooms
                    </li>
                    <li className="flex items-start">
                      <span className="bg-booking-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                      24/7 customer service
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
