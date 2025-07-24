import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getRoomsFromProperty } from "@/api/api";
import usepropertyStore from "@/store/propertyStore";
import { useCallback } from "react";

export interface PropertyProps {
  _id?: string,
  id: number;
  name: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  featured?: boolean;
  distanceFromCenter?: string;
}

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  const {
    _id,
    name,
    type,
    location,
    rating,
    reviews,
    price,
    imageUrl,
    featured,
    distanceFromCenter
  } = property;
  const { setpropertyId } = usepropertyStore()

  const handleSeeAvailability = useCallback(() => {
    if (!_id) throw new Error('Id not found')
    setpropertyId(_id)
  }, [_id]);
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Property image */}
          <div className="relative h-48 md:h-auto md:w-1/3">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            {featured && (
              <Badge className="absolute top-2 left-2 bg-booking-blue">
                Featured
              </Badge>
            )}
          </div>

          {/* Property details */}
          <div className="p-4 flex flex-col flex-grow md:w-2/3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">{type} in {location}</p>
                {distanceFromCenter && (
                  <p className="text-sm mt-1">
                    {distanceFromCenter} from center
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-booking-darkBlue text-white px-2 py-1 rounded flex items-center">
                  <span className="font-bold">{rating}</span>
                </div>
                <div className="text-sm">
                  <div>{rating >= 9 ? 'Exceptional' : rating >= 8 ? 'Very Good' : 'Good'}</div>
                  <div className="text-muted-foreground">{reviews} reviews</div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-4">
              <div className="flex items-center">
                {Array.from({ length: Math.floor(rating / 2) }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-booking-yellow text-booking-yellow" />
                ))}
              </div>

              <div className="text-right">
                <div className="text-lg font-bold">
                  ${price}
                </div>
                <p className="text-sm text-muted-foreground">per night</p>
                <Link to="/see-availability">
                  <button
                    onClick={handleSeeAvailability}
                    className="mt-2 bg-booking-blue hover:bg-booking-darkBlue text-white px-4 py-2 rounded text-sm font-medium">
                    See availability
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
