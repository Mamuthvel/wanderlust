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
    <Card className="overflow-hidden hover-lift glass-card rounded-2xl border-2 border-luxury-taupe/20 group animate-fade-in-up bg-gradient-to-br from-white to-safety-sky/10 shadow-lg hover:shadow-2xl">
      <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
          {/* Property image */}
          <div className="relative h-52 md:h-auto md:w-1/3 overflow-hidden rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/50 via-transparent to-luxury-emerald/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            {featured && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-luxury-emerald to-luxury-gold text-white rounded-full px-4 py-2 animate-bounce-gentle shadow-lg">
                🏔️ Sacred Choice
              </Badge>
            )}
          </div>

          {/* Property details */}
          <div className="p-6 flex flex-col flex-grow md:w-2/3">
            <div className="flex justify-between">
              <div className="flex-grow">
                <h3 className="font-bold text-xl text-luxury-charcoal group-hover:text-luxury-emerald transition-colors duration-300">{name}</h3>
                <p className="text-sm text-luxury-taupe font-medium mt-1">{type} in {location}</p>
                {distanceFromCenter && (
                  <p className="text-sm mt-2 text-luxury-taupe flex items-center">
                    <span className="w-2 h-2 bg-safety-sage rounded-full mr-2"></span>
                    {distanceFromCenter} from Arunachala Temple
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="bg-gradient-to-r from-luxury-emerald to-luxury-gold text-white px-4 py-2 rounded-xl flex items-center shadow-lg hover-scale transition-transform duration-300">
                  <span className="font-bold text-lg">{rating}</span>
                </div>
                <div className="text-sm text-right">
                  <div className="font-semibold text-luxury-emerald">{rating >= 9 ? 'Exceptional' : rating >= 8 ? 'Sacred' : 'Good'}</div>
                  <div className="text-luxury-taupe">{reviews} spiritual reviews</div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-6">
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.floor(rating / 2) }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-luxury-emerald text-luxury-emerald animate-bounce-gentle hover:scale-110 transition-transform" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-luxury-emerald">
                  ₹{price}
                </div>
                <p className="text-sm text-luxury-taupe mb-4">per sacred night</p>
                <Link to="/see-availability">
                  <button
                    onClick={handleSeeAvailability}
                    className="bg-gradient-to-r from-luxury-emerald to-luxury-gold hover:from-luxury-gold hover:to-safety-sage text-white px-6 py-3 rounded-xl text-sm font-semibold ripple hover-scale transition-all duration-300 shadow-lg hover:shadow-xl hover:animate-glow-pulse">
                    View Sacred Availability
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
