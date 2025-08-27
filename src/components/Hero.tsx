
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-nature-earth via-nature-temple to-nature-sunset text-white py-32 px-4 overflow-hidden">
      {/* Sacred mountain background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nature-temple/20 to-transparent animate-glow-pulse" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Floating temple silhouettes */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-nature-temple/10 rounded-full animate-float blur-lg" style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-1/3 w-24 h-24 bg-nature-leaf/15 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/6 w-20 h-20 bg-nature-sunset/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8 animate-fade-in-up bg-gradient-to-r from-white via-nature-temple to-nature-sky bg-clip-text text-transparent drop-shadow-2xl">
          Sacred Stays in Tiruvannamalai 🏔️
        </h1>
        <p className="text-xl md:text-2xl mb-16 animate-fade-in-up opacity-95 font-medium tracking-wide" style={{ animationDelay: '0.2s' }}>
          Experience the spiritual heart of Tamil Nadu with premium accommodations 🕉️
        </p>

        <div className="max-w-6xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <SearchForm />
        </div>
        
        {/* Sacred mountain elements */}
        <div className="absolute top-40 right-10 w-16 h-16 bg-nature-leaf/30 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-40 right-1/4 w-12 h-12 bg-nature-stone/40 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
};

export default Hero;
