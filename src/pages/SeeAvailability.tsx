import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { isAuthenticatedRoute } from "@/utils/getToken";
import { mockRooms } from "@/utils/mockRoom";
import { Room } from "@/utils/mockRoom";
import AvailabilityResults from "./AvailabilityResult";

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
        <form className="bg-white/95 border rounded-lg shadow p-6 gap-6 flex flex-col md:flex-row md:items-end md:gap-4"
          onSubmit={handleSubmit}
        >
          {/* Date Picker */}
          <div className="w-full md:w-1/2 flex flex-col mb-2 md:mb-0">
            <label className="block text-sm font-medium mb-2">Stay Dates</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`justify-start font-normal w-full ${!date?.from ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from && date?.to
                    ? `${format(date.from, "PP")} - ${format(date.to, "PP")}`
                    : <span>Pick dates</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  numberOfMonths={1}
                  disabled={d =>
                    d < new Date(
                      new Date().toDateString()
                    )
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Guests */}
          <div className="w-full md:w-1/4 flex flex-col">
            <label className="block text-sm font-medium mb-2">Guests</label>
            <Input
              type="number"
              min={1}
              max={8}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="w-full"
            />
          </div>
          {/* Button */}
          <div className="w-full md:w-1/4 flex items-end mt-3 md:mt-0">
            <Button
              className="w-full bg-booking-blue hover:bg-booking-darkBlue"
              type="submit"
              disabled={!date?.from || !date?.to || guests < 1}
            >
              See Rooms
            </Button>
          </div>
        </form>
        {/* Results */}
        {results !== null && (
          <AvailabilityResults
            availableRooms={results}
            startDate={date?.from}
            endDate={date?.to}
            guestCount={guests} />
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
