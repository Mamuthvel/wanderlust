
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/api";

const SignUp = ({ handleClose, handleOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      console.log(res, 'res');
      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className="flex flex-col bg-blue-100 bg-opacity-90 backdrop-blur-sm rounded-md py-5 
    transition-opacity duration-300 ease-in-out delay-100 opacity-100 animate-fadeIn">
      <div className="flex">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center sm:px-6 lg:flex-none lg:px-10 xl:px-14">
          <div className="w-full max-w-sm relative">
            <X className="absolute z-10 right-[-40px] cursor-pointer hover:text-red-600 drop-shadow" onClick={() => handleClose('signUp')} />
            <div className="mb-8">
              <Link
                to="/"
                className="text-2xl font-bold text-booking-blue mb-2 hover:text-booking-darkBlue"
              >
                WanderStay<span className="text-sm font-bold flex justify-end">Tiruvannamalai</span>
              </Link>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <div
                  className="font-medium text-booking-blue hover:text-booking-darkBlue cursor-pointer"
                  onClick={(e) => handleOpen('signIn')}
                >
                  Sign in
                </div>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="mt-1 relative text-black">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1 relative text-black">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative text-black">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
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
              </div>

              <Button type="submit" className="w-full bg-booking-blue hover:bg-booking-darkBlue">
                Sign up
              </Button>
            </form>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block relative flex-1">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Laptop computer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
