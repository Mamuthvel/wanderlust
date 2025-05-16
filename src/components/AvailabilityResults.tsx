
import React, { useState } from "react";
import BookingModal from "@/components/BookingModal";
import RoomCard, { Room } from "@/components/RoomCard";

interface AvailabilityResultsProps {
  availableRooms: Room[];
  startDate?: Date;
  endDate?: Date;
  guestCount: number;
}

const AvailabilityResults: React.FC<AvailabilityResultsProps> = ({
  availableRooms,
  startDate,
  endDate,
  guestCount,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!availableRooms.length)
    return (
      <div className="mt-8 text-center text-muted-foreground">
        No rooms are available for the selected dates and guests.
      </div>
    );

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {availableRooms.map((room) => (
        <RoomCard 
          key={room.id} 
          room={room} 
          onBookNow={handleBookNow} 
        />
      ))}

      {selectedRoom && (
        <BookingModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          room={selectedRoom}
          startDate={startDate}
          endDate={endDate}
          guestCount={guestCount}
        />
      )}
    </div>
  );
};

export default AvailabilityResults;
