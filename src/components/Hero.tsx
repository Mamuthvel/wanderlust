
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div 
      className="bg-booking-blue text-white py-8 md:py-12 px-4"
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find your next stay
          </h1>
          <p className="text-lg md:text-xl">
            Search low prices on hotels, homes and much more...
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
