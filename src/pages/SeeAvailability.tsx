
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Room {
  id: number;
  name: string;
  type: string;
  beds: number;
  maxGuests: number;
  price: number;
  imageUrl: string;
  amenities: string[];
}

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

function AvailabilityResults({
  availableRooms,
}: {
  availableRooms: Room[];
}) {
  if (!availableRooms.length)
    return (
      <div className="mt-8 text-center text-muted-foreground">
        No rooms are available for the selected dates and guests.
      </div>
    );

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {availableRooms.map((room) => (
        <Card key={room.id} className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex gap-4 items-center">
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />
              <div>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription>
                  {room.type} • {room.beds} Bed{room.beds > 1 ? "s" : ""} • Up to {room.maxGuests} Guests
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 text-sm mt-2">
              {room.amenities.map((a, i) => (
                <span key={i} className="bg-muted px-2 py-1 rounded">{a}</span>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div className="flex items-center gap-1">
                <Bed size={18} className="text-booking-blue" />
                <span>{room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-booking-blue">${room.price}</div>
                <div className="text-muted-foreground text-xs">per night</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const SeeAvailability = () => {
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [guests, setGuests] = useState<number>(2);
  const [results, setResults] = useState<Room[] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only filter by guest capacity with mock data
    const filtered = mockRooms.filter(r => guests <= r.maxGuests);
    setResults(filtered);
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
                  className={`justify-start font-normal w-full ${!date.from ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from && date.to
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
              disabled={!date.from || !date.to || guests < 1}
            >
              See Rooms
            </Button>
          </div>
        </form>
        {/* Results */}
        {results !== null && (
          <AvailabilityResults availableRooms={results} />
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
