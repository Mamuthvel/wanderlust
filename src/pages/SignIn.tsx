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
    <div className="glass rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mx-auto animate-scaleIn backdrop-blur-xl border border-white/20">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-glowPulse" />
        
        <div className="p-8 relative z-10">
          <button 
            className="absolute right-6 top-6 text-muted-foreground hover:text-destructive transition-all duration-300 hover:scale-110 hover:rotate-90" 
            onClick={() => handleClose('signIn')}
          >
            <X size={24} />
          </button>
          
          <div className="mx-auto">
            <div className="mb-8 animate-slideInLeft">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all duration-300"
              >
                WanderStay<span className="text-sm font-bold flex justify-end animate-float">Tiruvannamalai</span>
              </Link>
              <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Welcome back ✨
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Don't have an account?{" "}
                <span
                  className="font-medium cursor-pointer bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300"
                  onClick={() => handleOpen('signUp')}
                >
                  Sign up
                </span>
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
            <div className="group">
              <Label htmlFor="email" className="text-card-foreground font-medium">Email</Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 glass border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all duration-300 hover:bg-white/90 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-card-foreground font-medium">Password</Label>
                <a href="#" className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-secondary transition-all duration-300">
                  Forgot password?
                </a>
              </div>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 glass border-border/50 focus:border-primary/50 focus:ring-primary/30 transition-all duration-300 hover:bg-white/90 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-destructive mt-2 animate-slideInDown">{error}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground py-3 ripple transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 font-semibold"
            >
              Sign in ✨
            </Button>
            
            <div className="text-center mt-6 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our{" "}
                <a href="#" className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-secondary transition-all duration-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-secondary transition-all duration-300">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;