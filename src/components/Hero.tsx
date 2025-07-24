
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary-glow to-secondary text-white py-24 px-4 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glow-pulse" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
      
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 animate-fade-in-up bg-gradient-to-r from-white via-travel-lavender to-travel-sky bg-clip-text text-transparent drop-shadow-lg">
          Find your next stay ✨
        </h1>
        <p className="text-xl md:text-2xl mb-16 animate-fade-in-up opacity-95 font-medium" style={{ animationDelay: '0.2s' }}>
          Discover amazing places at unbeatable prices 🌍
        </p>

        <div className="max-w-6xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <SearchForm />
        </div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-accent/30 to-primary/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-travel-teal/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
};

export default Hero;
