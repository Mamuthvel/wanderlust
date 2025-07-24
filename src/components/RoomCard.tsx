
import React from "react";
import { Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Room } from "@/utils/mockRoom";


interface RoomCardProps {
  room: Room;
  onBookNow: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookNow }) => {
  
  return (
    <Card key={room.id} className="w-full max-w-md mx-auto hover-lift glass rounded-2xl border-0 group animate-scale-in">
      <CardHeader>
        <div className="flex gap-4 items-center">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <CardTitle className="text-xl group-hover:text-travel-blue transition-colors duration-300">{room.name}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {room.type} • {room.beds} Bed{room.beds > 1 ? "s" : ""} • Up to {room.maxGuests} Guests
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 text-sm mt-4">
          {room.amenities.map((a, i) => (
            <span key={i} className="bg-travel-blue/10 text-travel-blue px-3 py-1 rounded-full text-xs font-medium hover-scale transition-transform duration-200">
              {a}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-end">
          <div className="flex items-center gap-2">
            <Bed size={20} className="text-travel-blue animate-bounce-gentle" />
            <span className="font-medium">{room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-travel-blue">${room.price}</div>
            <div className="text-muted-foreground text-sm mb-3">per night</div>
            <Button 
              onClick={() => onBookNow(room)} 
              className="bg-travel-blue hover:bg-travel-blueGlow text-white px-6 py-3 rounded-xl text-sm font-semibold ripple hover-scale transition-all duration-300 shadow-lg"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
