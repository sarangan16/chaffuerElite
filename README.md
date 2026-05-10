Chauffeur Elite
Live site → https://chaffuer-elite.vercel.app
A chauffeur booking app I built for a client based in the UK. They needed a clean way for customers to book luxury airport transfers and point-to-point rides online, with instant pricing so people know what they're paying before they call.

What it does
Customers can pick their journey type (airport transfer or one way), enter their locations, choose a vehicle class and get a price straight away. The fare calculator picks up London congestion charge and airport fees automatically based on the postcode — so the client doesn't have to explain extra charges over the phone anymore.
The hero section has a car that slides in on load and tilts as you scroll, which took a while to get right on mobile vs desktop. GSAP's matchMedia ended up being the cleanest way to handle that.

Built with

React 19 + Vite
Tailwind CSS
GSAP + ScrollTrigger
Lenis (smooth scroll)
Lucide React
date-fns
Deployed on Vercel

Running locally
bashnpm install
npm run dev

Fare calculation
The booking form calculates the total in real time. Base rate depends on vehicle class (Saloon starts at £120/hr, Luxury at £250/hr). On top of that it checks the postcode against London congestion zone boundaries and adds airport pickup/drop fees for 13 UK airports including Heathrow, Gatwick and Manchester.

What's next
The backend is started (Express + Nodemailer) but not live yet. Plan is to hook up Stripe for payments and send booking confirmations by email. Also looking at using Google Maps API to switch from hourly to distance-based pricing.

Structure
src/
components/ # Navbar, Hero, BookingForm, CarList, WhyChooseUs, Testimonials, Footer
lib/ # Fare calculation logic and fee constants
helpers/ # Postcode and address utilities
