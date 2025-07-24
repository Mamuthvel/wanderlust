import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register, RegisterPayload } from "@/api/api";
import { toast } from "sonner";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// This schema matches the RegisterPayload interface
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = ({ handleClose, handleOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      // Explicitly cast the values as RegisterPayload to ensure type safety
      const payload: RegisterPayload = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      
      const res = await register(payload);
      
      if (res?.status === 201) {
        toast.success("Account created successfully! Please sign in.");
        setTimeout(() => {
          handleClose('signUp');
          handleOpen('signIn');
        }, 1500);
      } else {
        toast.error(res?.data?.message || "Failed to create account. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="glass rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mx-auto animate-scaleIn backdrop-blur-xl border border-white/20">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 animate-glowPulse" />
        
        <div className="p-8 relative z-10">
          <button 
            className="absolute right-6 top-6 text-muted-foreground hover:text-destructive transition-all duration-300 hover:scale-110 hover:rotate-90" 
            onClick={() => handleClose('signUp')}
          >
            <X size={24} />
          </button>
          
          <div className="mx-auto">
            <div className="mb-6 animate-slideInLeft">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300"
              >
                WanderStay<span className="text-sm font-bold flex justify-end animate-float">Tiruvannamalai</span>
              </Link>
              <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Create your account 🚀
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <span
                  className="font-medium cursor-pointer bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300"
                  onClick={() => handleOpen('signIn')}
                >
                  Sign in
                </span>
              </p>
            </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-card-foreground font-medium">Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors duration-300" />
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="pl-10 glass border-border/50 focus:border-secondary/50 focus:ring-secondary/30 transition-all duration-300 hover:bg-white/90 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="animate-slideInDown" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-card-foreground font-medium">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors duration-300" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10 glass border-border/50 focus:border-secondary/50 focus:ring-secondary/30 transition-all duration-300 hover:bg-white/90 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="animate-slideInDown" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-card-foreground font-medium">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors duration-300" />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 glass border-border/50 focus:border-secondary/50 focus:ring-secondary/30 transition-all duration-300 hover:bg-white/90 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <FormMessage className="animate-slideInDown" />
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-secondary-foreground py-3 mt-6 ripple transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating account... ⏳" : "Create account 🚀"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="#" className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300">
                Privacy Policy
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;