import { useState, useTransition } from "react";
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
import useSearchStore from "@/store/destinationStore";
import { getDestination } from "@/api/api";

const SearchForm = () => {
  const [isPending, startTransition] = useTransition();
  const { location, guests, checkIn, checkOut,
    clearSearch, setCheckIn, setCheckOut,
    setGuests, setLocation, setDestination } = useSearchStore();
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const isReady:any = location || checkIn && checkOut || guests.adults > 1 || guests.rooms > 1 || guests.children;

  const data = { location, checkIn, checkOut, guests };
  const getFilteredDestination = async (data) => {
    try {
      const result = await getDestination(data);
      setDestination(result);
    } catch (error) {
      console.log("Failed to retrived destination data");
    }
  }
  const handleSearch = (e) => {
    e.preventDefault();
    startTransition(()=>{
      getFilteredDestination(data)
    })
    console.log({
      location,
      checkIn,
      checkOut,
      guests
    });
  };
  const resetGuest = () => {
    setGuests({
      adults: 1,
      children: 0,
      rooms: 1
    })
  }
  return (
    <form
      onSubmit={handleSearch}
      className="w-full glass p-6 rounded-2xl shadow-2xl animate-slide-in-down hover-glow border-0"
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
                "pl-8 rounded-xl border-2 border-transparent focus:border-travel-blue transition-all duration-300 focus:animate-glow-pulse",
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
                  "w-full justify-start text-left font-normal rounded-xl border-2 border-transparent hover:border-travel-blue transition-all duration-300 hover-scale",
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
                  "w-full justify-start text-left font-normal rounded-xl border-2 border-transparent hover:border-travel-blue transition-all duration-300 hover-scale",
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
              "w-full justify-start text-left font-normal rounded-xl border-2 border-transparent hover:border-travel-blue transition-all duration-300 hover-scale",
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
            <div className="absolute top-full left-0 mt-1 w-full glass rounded-xl p-4 z-50 border animate-slide-in-down shadow-2xl">
              <div className="space-y-4">
                <GuestCounter
                  label="Adults"
                  value={guests.adults}
                  onIncrement={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                  onDecrement={() =>
                    setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })
                  }
                />
                <GuestCounter
                  label="Children"
                  value={guests.children}
                  onIncrement={() => setGuests({ ...guests, children: guests.children + 1 })}
                  onDecrement={() =>
                    setGuests({ ...guests, children: Math.max(0, guests.children - 1) })
                  }
                />
                <GuestCounter
                  label="Rooms"
                  value={guests.rooms}
                  onIncrement={() => setGuests({ ...guests, rooms: guests.rooms + 1 })}
                  onDecrement={() =>
                    setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })
                  }
                />
                <div className="flex gap-2 justify-center">
                  <Button
                    type="button"
                    onClick={() => resetGuest()}
                    className="mt-1 bg-travel-blue text-white hover:bg-travel-blueGlow rounded-xl ripple hover-scale transition-all duration-300"
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsGuestsOpen(false)}
                    className="mt-1 bg-travel-blue text-white hover:bg-travel-blueGlow rounded-xl ripple hover-scale transition-all duration-300"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search button */}
      <Button
        type="submit"
        disabled={!isReady}
        className="w-full mt-6 bg-travel-blue hover:bg-travel-blueGlow text-white rounded-xl py-3 text-lg font-semibold ripple hover-scale transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

const GuestCounter = ({ label, value, onIncrement, onDecrement }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-black text-sm">{label}</span>
    <div className="flex items-center">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-7 w-7 p-0 text-black"
        onClick={onDecrement}
      >
        -
      </Button>
      <span className="w-6 text-center text-black text-sm">{value}</span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-7 w-7 p-0 text-black"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  </div>
);

export default SearchForm;
