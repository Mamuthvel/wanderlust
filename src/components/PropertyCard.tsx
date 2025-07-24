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
    <Card className="overflow-hidden hover-lift glass rounded-2xl border-0 group animate-fade-in-up">
      <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
          {/* Property image */}
          <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {featured && (
              <Badge className="absolute top-3 left-3 bg-travel-sunset text-white rounded-full px-3 py-1 animate-bounce-gentle">
                ⭐ Featured
              </Badge>
            )}
          </div>

          {/* Property details */}
          <div className="p-6 flex flex-col flex-grow md:w-2/3">
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
                <div className="bg-travel-blue text-white px-3 py-2 rounded-xl flex items-center shadow-lg hover-scale transition-transform duration-200">
                  <span className="font-bold">{rating}</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-travel-blue">{rating >= 9 ? 'Exceptional' : rating >= 8 ? 'Very Good' : 'Good'}</div>
                  <div className="text-muted-foreground">{reviews} reviews</div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-6">
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.floor(rating / 2) }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-travel-sunset text-travel-sunset animate-bounce-gentle" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-travel-blue">
                  ${price}
                </div>
                <p className="text-sm text-muted-foreground mb-3">per night</p>
                <Link to="/see-availability">
                  <button
                    onClick={handleSeeAvailability}
                    className="bg-travel-blue hover:bg-travel-blueGlow text-white px-6 py-3 rounded-xl text-sm font-semibold ripple hover-scale transition-all duration-300 shadow-lg">
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
