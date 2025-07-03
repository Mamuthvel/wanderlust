import BookingModal from "@/components/BookingModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bed } from "lucide-react";
import React, { useState } from "react";
import { Room } from "@/utils/mockRoom";
const AvailabilityResults = React.memo(({
    availableRooms,
    startDate,
    endDate,
    guestCount,
}: {
    availableRooms: Room[];
    startDate?: Date;
    endDate?: Date;
    guestCount: number;
}) => {
    if (!availableRooms.length)
        return (
            <div className="mt-8 text-center text-muted-foreground">
                No rooms are available for the selected dates and guests.
            </div>
        );
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleBookNow = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };
    return (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
            {availableRooms.map((room) => (
                <Card key={room.id} className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <div className="flex gap-4 items-center">
                            <img
                                src={room.imageUrl}
                                alt={room.name}
                                className="w-20 h-20 rounded-lg object-cover border"
                            />
                            <div>
                                <CardTitle className="text-xl">{room.name}</CardTitle>
                                <CardDescription>
                                    {room.type} • {room.beds} Bed{room.beds > 1 ? "s" : ""} • Up to {room.maxGuests} Guests
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2 text-sm mt-2">
                            {room.amenities.map((a, i) => (
                                <span key={i} className="bg-muted px-2 py-1 rounded">{a}</span>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <div className="flex items-center gap-1">
                                <Bed size={18} className="text-booking-blue" />
                                <span>{room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-booking-blue">${room.price}</div>
                                <div className="text-muted-foreground text-xs">per night</div>
                                <Button
                                    onClick={() => handleBookNow(room)}
                                    className="mt-2 bg-booking-blue hover:bg-booking-darkBlue text-white px-4 py-2 rounded text-sm font-medium"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
})
export default AvailabilityResults;