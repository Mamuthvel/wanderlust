export interface Room {
    id: number;
    roomNo: number;
    name: string;
    type: string;
    beds: number;
    maxGuests: number;
    price: number;
    imageUrl: string;
    amenities: string[];
    availabilty:boolean;
    bookings:Date[]|null;
  }
  