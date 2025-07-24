import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Landmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useSearchStore from "@/store/destinationStore";

const FeaturedDestinations = ({ data }) => {
  const { destinations, setDestination } = useSearchStore();
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) setDestination(data)
  }, [])
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { current: container } = carouselRef;
      const scrollAmount = direction === 'left'
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-travel-sky/20 to-background">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent animate-fade-in-up">
            Explore destinations
          </h2>
          <div className="flex space-x-3 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scrollCarousel('left')} 
              className="mr-2 rounded-full hover-scale glass border-travel-blue/30 hover:border-travel-blue transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scrollCarousel('right')} 
              className="mr-4 rounded-full hover-scale glass border-travel-blue/30 hover:border-travel-blue transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Link to="/explore-destinations">
              <Button className="bg-travel-blue hover:bg-travel-blueGlow rounded-full px-6 py-2 ripple hover-scale transition-all duration-300">
                <Landmark className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>
        </div>

        <div ref={carouselRef} className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {destinations?.map((destination, index) => (
            <Card
              key={destination.id}
              className="min-w-[280px] md:min-w-[320px] flex-none snap-start hover-lift cursor-pointer glass rounded-2xl border-0 overflow-hidden group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(destination.urlSlug ? `/destination/${destination.urlSlug}` : "/see-availability")}
            >
              <CardContent className="p-0">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center space-x-1 text-sm font-medium">
                      <span>✨</span>
                      <span>Discover more</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-foreground group-hover:text-travel-blue transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground mt-1">{destination.country}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-travel-ocean font-medium">{destination.properties} properties</p>
                    <div className="w-6 h-6 rounded-full bg-travel-blue/10 flex items-center justify-center group-hover:bg-travel-blue group-hover:scale-110 transition-all duration-300">
                      <span className="text-xs text-travel-blue group-hover:text-white">→</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
