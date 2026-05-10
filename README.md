Chauffeur Elite

Premium chauffeur booking platform built for a UK-based luxury transport client.
Live Demo → chaffuer-elite.vercel.app

##About
A chauffeur booking app I built for a client based in the UK. They needed a clean way for customers to book luxury airport transfers and point-to-point rides online, with instant pricing so people know what they're paying before they call.
The fare calculator picks up London congestion charge and airport fees automatically based on the postcode — so the client doesn't have to explain extra charges over the phone anymore.
The hero section uses a full-screen looping video background with GSAP-animated text on top. Getting the overlay opacity right so the video stays visible but text stays readable took a few iterations.

##Features

🎬 Full-screen video hero with GSAP text animations
📍 Smart booking form — airport transfer or one-way journey
💷 Real-time fare calculator with congestion charge + airport fee detection
🚗 Fleet section — 6 vehicle classes with scroll-triggered card animations
✅ Why Choose Us — animated feature cards
💬 Testimonials carousel with auto-play
📱 Fully responsive — mobile drawer menu#

##Getting Started
npm install
npm run dev

##Build for production:
npm run build

##Fare Calculation
The booking form calculates the total in real time:
ItemDetailBase rate£120/hr (Saloon) → £250/hr (Luxury)Congestion charge£15 — detected from EC, WC, W1, SW1 postcodesAirport feePickup/drop fees for 13 UK airports

##Project Structure
src/
├── components/
│ ├── Navbar.jsx # Fixed nav with mobile drawer
│ ├── Hero.jsx # Full-screen video hero + booking form
│ ├── BookingForm.jsx # Journey type, vehicle picker, fare calculator
│ ├── CarList.jsx # Fleet grid with scroll animations
│ ├── WhyChooseUs.jsx # Feature cards
│ ├── Testimonials.jsx # Auto-play review carousel
│ └── Footer.jsx # Footer with contact and links
├── lib/
│ ├── fees.js # Airport and congestion charge constants
│ └── calculateFees.js # Fee calculation logic
└── helpers/
└── location.js # Postcode utilities
