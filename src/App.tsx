
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import SeeAvailability from "./pages/SeeAvailability";
import ExploreDestinations from "./pages/ExploreDestinations";
import DestinationDetail from "./pages/DestinationDetail";
import ProtectedRoute from "./pages/protectedPage/protected";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/see-availability" element={<SeeAvailability />} />
            <Route path="/explore-destinations" element={<ExploreDestinations />} />
            <Route path="/destination/:destinationId" element={<DestinationDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
