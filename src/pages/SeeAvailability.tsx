// src/pages/SeeAvailability.tsx
import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AvailabilitySearchForm from "@/components/AvailabilitySearchForm";
import AvailabilityResults from "@/components/AvailabilityResults";
import { isAuthenticatedRoute } from "@/utils/getToken";
import zustandStore from "@/store";
import usePropertyStore from "@/store/propertyStore";
import { Room } from "@/utils/mockRoom";
import { getRoomsFromProperty } from "@/api/api";


const SeeAvailability = () => {
  const {
    start,
    setStart,
    end,
    setEnd,
    guests,
    setGuests,
    roomsData,
    setRoomsData,
    propertyId
  } = usePropertyStore();

  const [date, setDate] = useState<DateRange | undefined>({
    from: start,
    to: end
  });

  // const [results, setResults] = useState<Room[] | null>(null);

  const isAuthenticated = zustandStore((state) => state.isAuthenticated);
  const fetchPropertyRooms = async (propertyId: string) => {
    try {
      const result = await getRoomsFromProperty({ propertyId });

      setRoomsData(result);
    } catch (error) {
      console.log("Failed to fetch roomsdata", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticatedRoute()) {
      zustandStore.getState().toggleSignIn(true);
      return;
    } else {
      await fetchPropertyRooms(propertyId)
    }

  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-10 pb-16 max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-booking-blue">
          See Room Availability
        </h1>
        <p className="mb-8 text-muted-foreground text-lg">
          Select your dates and number of guests to view available rooms for your stay.
        </p>

        <AvailabilitySearchForm
          date={date}
          setDate={setDate}
          guests={guests || 2}
          setGuests={setGuests}
          onSearch={handleSubmit}
        />

        {isAuthenticated && roomsData !== null && (
          <AvailabilityResults
            availableRooms={roomsData}
            startDate={date?.from}
            endDate={date?.to}
            guestCount={guests}
          />
        )}

        {roomsData === null && (
          <div className="mt-10 text-center text-muted-foreground">
            Choose your dates and guests, then click <span className="text-booking-blue font-medium">See Rooms</span>{" "}
            to view what&apos;s available for your stay.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SeeAvailability;
