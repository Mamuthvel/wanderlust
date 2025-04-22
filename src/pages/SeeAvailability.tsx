
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SeeAvailability = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 pt-12 pb-16">
      <h1 className="text-3xl font-bold mb-4 text-booking-blue">Check Availability</h1>
      <p className="mb-6 text-lg text-muted-foreground">Please select your dates and guests to see available rooms and rates. Feature coming soon.</p>
      {/* Placeholder for future booking calendar and options */}
      <div className="border rounded-lg bg-white p-8 shadow flex flex-col items-center">
        <span className="text-booking-blue/70 text-2xl font-semibold mb-2">Coming Soon</span>
        <p className="text-muted-foreground">The availability and booking feature is under construction. Stay tuned!</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default SeeAvailability;
