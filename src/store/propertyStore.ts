import { PropertyProps } from "@/components/PropertyCard";
import { Room } from "@/utils/mockRoom";
import { create } from "zustand";

interface PropertyType {
    propertyData: PropertyProps[] | null;
    roomsData: Room[] | null;
    start: Date | null;
    end: Date | null;
    guests: number | null;
    minPrice: number;
    maxPrice: number;
    type: string | null;
    sort: string;
    propertyId: string;
    setStart: (start: Date | null) => void;
    setEnd: (end: Date | null) => void;
    setGuests: (guests: number | null) => void;
    setMinPrice: (min: number) => void;
    setMaxPrice: (max: number) => void;
    settype: (type: string | null) => void;
    setSort: (sort: string) => void;
    setpropertyId: (id: string) => void;
    setPropertyData: (property: any | null) => void;
    setRoomsData: (room: any) => void;
    clearFilter: () => void;
    // handle
}

const usepropertyStore = create<PropertyType>()((set) => ({
    propertyData: null,
    start: null,
    end: null,
    guests: null,
    minPrice: 0,
    maxPrice: 1200,
    type: 'all',
    sort: "recommended",
    propertyId: '',
    roomsData: null,
    setStart: (start) => set({ start }),
    setEnd: (end) => set({ end }),
    setGuests: (guests) => set({ guests }),
    setMinPrice: (minPrice) => set({ minPrice }),
    setMaxPrice: (maxPrice) => set({ maxPrice }),
    settype: (type) => set({ type }),
    setSort: (sort) => set({ sort }),
    setpropertyId: (id) => set({ propertyId: id }),
    setPropertyData: (propertyData) => set({ propertyData: Array.isArray(propertyData) ? propertyData : [propertyData] }),
    setRoomsData: (rooms) => set({ roomsData: Array.isArray(rooms) ? rooms : [rooms] }),
    clearFilter: () => set({
        minPrice: 0,
        maxPrice: 1200,
        type: 'all',
        sort: "recommended",
    })
}));

export default usepropertyStore;