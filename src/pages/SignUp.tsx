
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
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full mx-auto flex animate-fadeIn">
      {/* Left side - Form */}
      <div className="flex-1 p-8 relative">
        <button 
          className="absolute right-6 top-6 text-gray-500 hover:text-red-600 transition-colors" 
          onClick={() => handleClose('signUp')}
        >
          <X size={24} />
        </button>
        
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="text-2xl font-bold text-booking-blue mb-2 hover:text-booking-darkBlue cursor-pointer"
            >
              WanderStay<span className="text-sm font-bold flex justify-end">Tiruvannamalai</span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="font-medium cursor-pointer text-booking-blue hover:text-booking-darkBlue"
                onClick={() => handleOpen('signIn')}
              >
                Sign in
              </span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="pl-10 bg-white border-gray-300 focus:border-booking-blue focus:ring-booking-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10 bg-white border-gray-300 focus:border-booking-blue focus:ring-booking-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 bg-white border-gray-300 focus:border-booking-blue focus:ring-booking-blue"
                          {...field}
                        />
                      </FormControl>
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
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-booking-blue hover:bg-booking-darkBlue text-white py-2.5 mt-4"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              By signing up, you agree to our{" "}
              <a href="#" className="text-booking-blue hover:text-booking-darkBlue">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-booking-blue hover:text-booking-darkBlue">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Setup your account"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="px-8 text-white max-w-md">
            <h3 className="text-2xl font-bold mb-4">Start your journey with WanderStay</h3>
            <p className="text-white/90">Join thousands of travelers who choose WanderStay for unforgettable stays in Tiruvannamalai and beyond.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
