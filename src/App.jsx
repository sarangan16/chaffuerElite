import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import CarList from "./components/CarList";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CarList />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
