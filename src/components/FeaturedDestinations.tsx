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
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Explore destinations</h2>
          <div className="flex space-x-2 items-center">
            <Button variant="outline" size="icon" onClick={() => scrollCarousel('left')} className="mr-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scrollCarousel('right')} className="mr-4">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Link to="/explore-destinations">
              <Button variant="default" className="bg-booking-blue hover:bg-booking-darkBlue">
                <Landmark className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>
        </div>

        <div ref={carouselRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {destinations?.map((destination) => (
            <Card
              key={destination.id}
              className="min-w-[240px] md:min-w-[280px] flex-none snap-start hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate(destination.urlSlug ? `/destination/${destination.urlSlug}` : "/see-availability")}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{destination.name}</h3>
                  <p className="text-muted-foreground">{destination.country}</p>
                  <p className="text-sm mt-2">{destination.properties} properties</p>
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
