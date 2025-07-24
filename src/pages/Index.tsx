
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
        <div className="container mx-auto px-4 py-8">
          <div className="bg-booking-lightBlue rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold mb-2">Find your next stay</h2>
            <p className="text-lg">
              Search deals on hotels, homes, and much more...
            </p>
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
