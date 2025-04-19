
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search as SearchIcon, 
  Calendar as CalendarIcon,
  Users
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1
  });
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log({
      location,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full bg-white p-4 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Location */}
        <div className="md:col-span-2">
          <Label htmlFor="location" className="text-sm font-medium mb-1 block">
            Where are you going?
          </Label>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="location"
              placeholder="Enter a destination"
              className={cn(
                "pl-8", 
                location ? "text-black" : "text-muted-foreground"
              )}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Check-in / Check-out */}
        <div>
          <Label className="text-sm font-medium mb-1 block">Check-in date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn ? "text-muted-foreground" : "text-black"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1 block">Check-out date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut ? "text-muted-foreground" : "text-black"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => 
                  date < new Date() || (checkIn && date <= checkIn)
                }
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="relative">
          <Label className="text-sm font-medium mb-1 block">Guests</Label>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              guests.adults + guests.children !== 1 || guests.rooms !== 1 
                ? "text-black" 
                : "text-muted-foreground"
            )}
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>
              {guests.adults + guests.children} guests, {guests.rooms} {guests.rooms === 1 ? 'room' : 'rooms'}
            </span>
          </Button>

          {isGuestsOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md p-4 z-10">
              <div className="space-y-4">
                <GuestCounter
                  label="Adults"
                  value={guests.adults}
                  onIncrement={() => setGuests({...guests, adults: guests.adults + 1})}
                  onDecrement={() => 
                    setGuests({...guests, adults: Math.max(1, guests.adults - 1)})
                  }
                />
                <GuestCounter
                  label="Children"
                  value={guests.children}
                  onIncrement={() => setGuests({...guests, children: guests.children + 1})}
                  onDecrement={() => 
                    setGuests({...guests, children: Math.max(0, guests.children - 1)})
                  }
                />
                <GuestCounter
                  label="Rooms"
                  value={guests.rooms}
                  onIncrement={() => setGuests({...guests, rooms: guests.rooms + 1})}
                  onDecrement={() => 
                    setGuests({...guests, rooms: Math.max(1, guests.rooms - 1)})
                  }
                />
                
                <Button 
                  type="button" 
                  onClick={() => setIsGuestsOpen(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search button */}
      <Button 
        type="submit" 
        className="w-full mt-4 bg-booking-blue hover:bg-booking-darkBlue text-white"
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

const GuestCounter = ({ label, value, onIncrement, onDecrement }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={onDecrement}
      >
        -
      </Button>
      <span className="w-6 text-center">{value}</span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  </div>
);

export default SearchForm;

