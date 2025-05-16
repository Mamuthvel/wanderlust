export interface Room {
  id: number;
  name: string;
  type: string;
  beds: number;
  maxGuests: number;
  price: number;
  imageUrl: string;
  amenities: string[];
}

export const mockRooms: Room[] = [
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