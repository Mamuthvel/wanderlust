
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-travel-blue via-travel-blueGlow to-travel-ocean text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-glow-pulse" />
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up bg-gradient-to-r from-white via-travel-sky to-white bg-clip-text text-transparent">
          Find your next stay
        </h1>
        <p className="text-xl md:text-2xl mb-12 animate-fade-in-up opacity-90" style={{ animationDelay: '0.2s' }}>
          Search low prices on hotels, homes and much more...
        </p>

        <div className="max-w-6xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <SearchForm />
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-20 w-12 h-12 bg-travel-sunset/30 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-travel-ocean/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Hero;
