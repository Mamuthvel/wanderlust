
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/api";
import zustandStore from "@/store";
import { toast } from "sonner";

const SignIn = ({ handleClose, handleOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = zustandStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await login({ email, password });
      if (res.status === 200 && res?.data?.user) {
        setUser(res.data.user);
        zustandStore.getState().toggleSignIn(false); 
        toast.success("Login successful!", { duration: 2000 });
      } else {
        setError(res?.data?.message || "Login failed. Please try again.");
        toast.error(res?.data?.message || "Login failed.",{ duration: 2000 });
      }
    } catch (err: any) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full mx-auto flex animate-fadeIn">
      {/* Left side - Form */}
      <div className="flex-1 p-8 relative">
        <button 
          className="absolute right-6 top-6 text-gray-500 hover:text-red-600 transition-colors" 
          onClick={() => handleClose('signIn')}
        >
          <X size={24} />
        </button>
        
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="text-2xl font-bold text-booking-blue mb-2 hover:text-booking-darkBlue cursor-pointer"
            >
              WanderStay<span className="text-sm font-bold flex justify-end">Tiruvannamalai</span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="font-medium cursor-pointer text-booking-blue hover:text-booking-darkBlue"
                onClick={() => handleOpen('signUp')}
              >
                Sign up
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white border-gray-300 focus:border-booking-blue focus:ring-booking-blue"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <a href="#" className="text-sm font-medium text-booking-blue hover:text-booking-darkBlue">
                  Forgot password?
                </a>
              </div>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white border-gray-300 focus:border-booking-blue focus:ring-booking-blue"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-booking-blue hover:bg-booking-darkBlue text-white py-2.5"
            >
              Sign in
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                By signing in, you agree to our{" "}
                <a href="#" className="text-booking-blue hover:text-booking-darkBlue">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-booking-blue hover:text-booking-darkBlue">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1630395822970-acd6a691d97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Luxury hotel room"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
