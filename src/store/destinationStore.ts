import { DestinationData } from "@/pages/DestinationDetail";
import { create } from "zustand";

// Interfaces
interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

interface SearchStore {
  location: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: Guests;
  destinations: DestinationData[] | null;
  setSearch: (data: SearchStore) => void;
  setLocation: (loc: string | null) => void;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setGuests: (guests: Guests) => void;
  setDestination: (des: DestinationData) => void;
  clearSearch: () => void;
}

// ✅ Create Store
const useSearchStore = create<SearchStore>()(
  // persist(
    (set) => ({
      destinations: null,
      location: null, 
      checkIn: null,
      checkOut: null,
      guests: {
        adults: 1,
        children: 0,
        rooms: 1
      },
      
      setSearch: ({ location, checkIn, checkOut, guests }) =>
        set({ location, checkIn, checkOut, guests }),

      setLocation: (loc) => set({ location: loc }),
      setCheckIn: (date) => set({ checkIn: date }),
      setCheckOut: (date) => set({ checkOut: date }),
      setGuests: (guests) => set({ guests }),
      setDestination: (des) => set({ destinations: Array.isArray(des) ? des : [des] }), //handle single and multi array
      clearSearch: () =>
        set({
          location: null,
          checkIn: null,
          checkOut: null,
          guests: {
            adults: 1,
            children: 0,
            rooms: 1
          }
        })
    }),
  //   {
  //     name: "search-storage", // Key for localStorage
  //     partialize: (state) => ({
  //       location: state.location,
  //       checkIn: state.checkIn,
  //       checkOut: state.checkOut,
  //       guests: state.guests,
  //     })
  //   }
  // )
);

export default useSearchStore;
