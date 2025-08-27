
import { Link } from "react-router-dom";
import { Bed, Car, PlaneTakeoff, Landmark, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import zustandStore from "@/store";
import HoverUserDropdown from "./commoncomponent/HoverUserDropdown";
import { isAuthenticatedRoute } from "@/utils/getToken";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpenSignIn, isOpenSignUp, toggleSignIn, toggleSignUp,isAuthenticated } = zustandStore();
  const handleClick = (val: string) => {
    const result = val === 'signUp' ? toggleSignUp(!isOpenSignUp) : toggleSignIn(!isOpenSignIn)
    return result
  };
  const handleClose = (val) => {
    const result = val === 'signUp' ? toggleSignUp(false) : toggleSignIn(false)
    return result
  };
  const handleOpen = (val) => {
    val === 'signIn' ? (toggleSignUp(false), toggleSignIn(true)) : (toggleSignIn(false), toggleSignUp(true))
  }
  return (
    <><nav className="bg-gradient-to-r from-nature-earth to-nature-stone text-white py-6 relative shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold m-0 hover:scale-105 transition-transform duration-300 group">
            <span className="bg-gradient-to-r from-nature-temple to-nature-sunset bg-clip-text text-transparent">
              WanderStay
            </span>
            <br />
            <span className="text-sm font-bold flex justify-end text-nature-sky group-hover:text-nature-temple transition-colors">
              Tiruvannamalai
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItem icon={<Bed size={18} />} label="Stays" path="/" active />
            <NavItem icon={<Landmark size={18} />} label="Explore" path="/explore-destinations" />
          </div>

          {/* User buttons */}
          <div className="hidden md:flex items-center space-x-4">

            {/* <Link to="/signup"> */}
            {isAuthenticated ? <HoverUserDropdown /> : <Button className="bg-nature-temple text-white hover:bg-nature-sunset hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" onClick={(e) => handleClick('signIn')}>
              Sign In
            </Button>}

          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden mt-4 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}>
          <div className="flex flex-col space-y-2 pb-4">
            <MobileNavItem icon={<Bed size={18} />} label="Stays" path="/" active />
            <MobileNavItem icon={<Landmark size={18} />} label="Explore" path="/explore-destinations" />
            <div className="border-t border-booking-darkBlue pt-2 mt-2 space-y-2">
              {isAuthenticatedRoute() ? <HoverUserDropdown /> : <Button className="bg-nature-temple text-white hover:bg-nature-sunset" onClick={(e) => handleClick('signIn')}>
                Sign In
              </Button>}
            </div>
          </div>
        </div>
      </div>
      {isOpenSignUp && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center "><SignUp handleClose={handleClose} handleOpen={handleOpen} /></div>}
      {isOpenSignIn && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"><SignIn handleClose={handleClose} handleOpen={handleOpen} /></div>}
    </nav>
    </>
  );
};

const NavItem = ({ icon, label, path, active = false }) => (
  <Link
    to={path}
    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
      active ? "bg-nature-temple shadow-lg" : "hover:bg-nature-stone/50 hover:shadow-md"
    }`}
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </Link>
);

const MobileNavItem = ({ icon, label, path, active = false }) => (
  <Link
    to={path}
    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-300 ${
      active ? "bg-nature-temple shadow-lg" : "hover:bg-nature-stone/50"
    }`}
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Navbar;
