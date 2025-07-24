
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="relative bg-booking-blue text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Search low prices on hotels, homes and much more...
        </p>

        <div className="max-w-5xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
