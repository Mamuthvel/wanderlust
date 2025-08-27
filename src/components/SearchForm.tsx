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
      className="w-full glass p-8 rounded-2xl shadow-2xl animate-slide-in-down hover-glow border-2 border-nature-temple/20 bg-gradient-to-br from-white/95 to-nature-sky/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Location */}
        <div className="md:col-span-2">
          <Label htmlFor="location" className="text-sm font-medium mb-3 block text-nature-earth">
            Sacred Destination
          </Label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nature-stone h-4 w-4" />
            <Input
              id="location"
              placeholder="Discover Tiruvannamalai"
              className={cn(
                "pl-10 rounded-xl border-2 border-nature-stone/30 focus:border-nature-temple transition-all duration-300 focus:animate-glow-pulse bg-white/95 shadow-md hover:scale-[1.02] focus:scale-105",
                location ? "text-nature-earth" : "text-nature-stone"
              )}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Check-in / Check-out */}
        <div>
          <Label className="text-sm font-medium mb-3 block text-nature-earth">Arrival</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-xl border-2 border-nature-stone/30 hover:border-nature-temple transition-all duration-300 hover-scale bg-white/95 shadow-md hover:scale-[1.02]",
                  !checkIn ? "text-nature-stone" : "text-nature-earth"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-nature-temple" />
                {checkIn ? format(checkIn, "MMM d, yyyy") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card border-nature-stone/20" align="start">
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
          <Label className="text-sm font-medium mb-3 block text-nature-earth">Departure</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-xl border-2 border-nature-stone/30 hover:border-nature-temple transition-all duration-300 hover-scale bg-white/95 shadow-md hover:scale-[1.02]",
                  !checkOut ? "text-nature-stone" : "text-nature-earth"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-nature-temple" />
                {checkOut ? format(checkOut, "MMM d, yyyy") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card border-nature-stone/20" align="start">
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
          <Label className="text-sm font-medium mb-3 block text-nature-earth">Pilgrims</Label>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal rounded-xl border-2 border-nature-stone/30 hover:border-nature-temple transition-all duration-300 hover-scale bg-white/95 shadow-md hover:scale-[1.02]",
              guests.adults + guests.children !== 1 || guests.rooms !== 1
                ? "text-nature-earth"
                : "text-nature-stone"
            )}
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
          >
            <Users className="mr-2 h-4 w-4 text-nature-temple" />
            <span>
              {guests.adults + guests.children} pilgrims, {guests.rooms} {guests.rooms === 1 ? 'room' : 'rooms'}
            </span>
          </Button>

          {isGuestsOpen && (
            <div className="absolute top-full left-0 mt-2 w-full glass rounded-xl p-5 z-50 border-2 border-nature-temple/20 animate-slide-in-down shadow-2xl bg-gradient-to-br from-white/95 to-nature-sky/20">
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
                <div className="flex gap-3 justify-center">
                  <Button
                    type="button"
                    onClick={() => resetGuest()}
                    className="mt-2 bg-nature-stone text-white hover:bg-nature-earth rounded-xl ripple hover-scale transition-all duration-300 shadow-md"
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsGuestsOpen(false)}
                    className="mt-2 bg-nature-temple text-white hover:bg-nature-sunset rounded-xl ripple hover-scale transition-all duration-300 shadow-md"
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
        className="w-full mt-8 bg-gradient-to-r from-nature-temple to-nature-sunset hover:from-nature-sunset hover:to-nature-leaf text-white rounded-xl py-4 text-lg font-semibold ripple hover-scale transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:animate-glow-pulse"
      >
        <SearchIcon className="mr-2 h-5 w-5" />
        Find Sacred Stays
      </Button>
    </form>
  );
};

const GuestCounter = ({ label, value, onIncrement, onDecrement }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-nature-earth text-sm font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 text-nature-earth border-nature-stone/30 hover:border-nature-temple hover:bg-nature-temple hover:text-white transition-all duration-300 rounded-lg"
        onClick={onDecrement}
      >
        -
      </Button>
      <span className="w-8 text-center text-nature-earth text-sm font-semibold">{value}</span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 text-nature-earth border-nature-stone/30 hover:border-nature-temple hover:bg-nature-temple hover:text-white transition-all duration-300 rounded-lg"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  </div>
);

export default SearchForm;
