
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PropertyList from "@/components/PropertyList";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { getDestination } from "@/api/api";
import usepropertyStore from "@/store/propertyStore";
import { Destination } from "./ExploreDestinations";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [loadingproperty, setLoadingProperty] = useState(true);
  const [data, setData] = useState<any>(null);
  const { setPropertyData } = usepropertyStore()
  const getFilteredDestination = async () => {
    try {
      const result = await getDestination();
      setData(result)
    } catch (error) {
      console.log("Destination data not retrived");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFilteredDestination();
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-1">
        {loading ? (
          <div className="text-center py-10">Loading destinations...</div>
        ) : (
          <FeaturedDestinations data={data} />
        )}
        <div className="container mx-auto px-4 py-12">
          <div className="glass rounded-2xl p-8 mb-12 border-0 hover-glow animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
                🏨 Find your next stay
              </h2>
              <p className="text-xl text-muted-foreground">
                Search deals on hotels, homes, and much more...
              </p>
              <div className="flex justify-center mt-6 space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-travel-blue rounded-full animate-bounce-gentle"></span>
                  <span>Best Prices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-travel-sunset rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></span>
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-travel-ocean rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PropertyList />

      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
