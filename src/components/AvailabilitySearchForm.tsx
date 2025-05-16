
import React from "react";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { isAuthenticatedRoute } from "@/utils/getToken";

interface AvailabilitySearchFormProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  onSearch: (e: React.FormEvent) => void;
}

const AvailabilitySearchForm: React.FC<AvailabilitySearchFormProps> = ({
  date,
  setDate,
  guests,
  setGuests,
  onSearch
}) => {
  return (
    <form className="bg-white/95 border rounded-lg shadow p-6 gap-6 flex flex-col md:flex-row md:items-end md:gap-4"
      onSubmit={onSearch}
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
  );
};

export default AvailabilitySearchForm;
