
import { useEffect, useState } from "react";
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
import usepropertyStore from "@/store/propertyStore";
import { getProperty } from "@/api/api";

const PropertyList = () => {
  // const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const { propertyData,
    minPrice,
    maxPrice,
    type,
    sort,
    setMaxPrice, setMinPrice, settype, setSort, setPropertyData,clearFilter } = usepropertyStore();
  // const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  // const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchProperties = async () => {
        const data = await getProperty({
          minPrice,
          maxPrice,
          type,
          sort,
        });

        setPropertyData(data);
      };

      fetchProperties();
    }, 1000);

    return () => clearTimeout(handler);    
  }, [minPrice, maxPrice, type, sort]);

  
  const handleClearFilter = () => {
    clearFilter()
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-travel-sky/10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent animate-fade-in-up">
          Available properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter sidebar */}
          <div className="p-6 glass rounded-2xl border-0 h-fit animate-slide-in-down sticky top-6">
            <h3 className="font-semibold text-xl mb-6 text-travel-blue">Filter by:</h3>

            <div className="space-y-8">
              {/* Price range filter */}
              <div>
                <Label className="mb-2 block">Price range per night</Label>
                <div className="px-2">
                  <Slider
                    value={[minPrice, maxPrice]}
                    max={1200}
                    step={50}
                    onValueChange={([min, max]) => {
                      setMinPrice(min);
                      setMaxPrice(max);
                    }}
                    className="my-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="border rounded-md px-2 py-1">
                  &#8377;{minPrice}
                  </div>
                  <div className="border rounded-md px-2 py-1">
                  &#8377;{maxPrice}
                  </div>
                </div>
              </div>

              {/* Property type filter */}
              <div>
                <Label htmlFor="propertyType" className="mb-2 block">Property type</Label>
                <Select value={type} onValueChange={settype}>
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="Guesthouse">Guest House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="Ashram">Ashram</SelectItem>
                    <SelectItem value="Lodge">Lodge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleClearFilter} 
                className="w-full bg-travel-ocean hover:bg-travel-forest rounded-xl py-3 ripple hover-scale transition-all duration-300"
              >
                Clear filters
              </Button>
            </div>
          </div>

          {/* Properties list */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm">
                {propertyData?.length} properties found
              </p>
              <div className="flex items-center">
                <Label htmlFor="sortBy" className="mr-2 text-sm">Sort by:</Label>
                <Select value={sort} onValueChange={setSort}>
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

            <div className="space-y-6">
              {!propertyData ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-blue"></div>
                  <p className="ml-4 text-lg text-muted-foreground">Loading properties...</p>
                </div>
              ) : (
                propertyData?.map((property, index) => (
                  <div key={property.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <PropertyCard property={property} />
                  </div>
                )))}
              {propertyData?.length === 0 && (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="text-6xl mb-4">🏨</div>
                  <p className="text-2xl font-semibold text-foreground mb-2">No properties found</p>
                  <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
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
