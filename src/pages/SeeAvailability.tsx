
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AvailabilitySearchForm from "@/components/AvailabilitySearchForm";
import AvailabilityResults from "@/components/AvailabilityResults";
import { isAuthenticatedRoute } from "@/utils/getToken";
import { Room } from "@/components/RoomCard";

// Mock data moved to the main component for data management
const mockRooms: Room[] = [
  {
    id: 1,
    name: "Deluxe King Room",
    type: "Deluxe",
    beds: 1,
    maxGuests: 2,
    price: 140,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "Ensuite Bathroom", "Breakfast"],
  },
  {
    id: 2,
    name: "Family Suite",
    type: "Suite",
    beds: 2,
    maxGuests: 4,
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "Kitchenette", "Balcony", "Breakfast"],
  },
  {
    id: 3,
    name: "Standard Queen",
    type: "Standard",
    beds: 1,
    maxGuests: 2,
    price: 99,
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    amenities: ["WiFi", "Breakfast"],
  },
];

const SeeAvailability = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [guests, setGuests] = useState<number>(2);
  const [results, setResults] = useState<Room[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only filter by guest capacity with mock data
    if (!isAuthenticatedRoute()) {
      alert('Please login to See the Available room');
      return;
    } else {
      const filtered = mockRooms.filter(r => guests <= r.maxGuests);
      setResults(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-10 pb-16 max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-booking-blue">See Room Availability</h1>
        <p className="mb-8 text-muted-foreground text-lg">
          Select your dates and number of guests to view available rooms for your stay.
        </p>
        
        <AvailabilitySearchForm
          date={date}
          setDate={setDate}
          guests={guests}
          setGuests={setGuests}
          onSearch={handleSubmit}
        />
        
        {/* Results */}
        {results !== null && (
          <AvailabilityResults 
            availableRooms={results} 
            startDate={date?.from}
            endDate={date?.to}
            guestCount={guests}
          />
        )}
        
        {/* Optionally: Show helpful message when no results yet */}
        {results === null && (
          <div className="mt-10 text-center text-muted-foreground">
            Choose your dates and guests, then click <span className="text-booking-blue font-medium">See Rooms</span> to view what&apos;s available for your stay.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SeeAvailability;
