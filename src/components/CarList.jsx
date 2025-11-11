"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cars = [
  {
    name: "Saloon",
    desc: "Mercedes E-Class or similar",
    rate: 120,
    seats: 3,
    luggage: 2,
    img: "https://images.unsplash.com/photo-1629019879059-2a0345f93aea?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Executive",
    desc: "Mercedes S-Class or BMW 7 Series",
    rate: 180,
    seats: 3,
    luggage: 2,
    img: "https://images.unsplash.com/photo-1694895996049-f9e356afddd8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Luxury",
    desc: "Bentley Flying Spur or Range Rover Vogue",
    rate: 250,
    seats: 3,
    luggage: 2,
    img: "https://images.unsplash.com/photo-1679506640617-e429ddc31e52?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "SUV",
    desc: "Range Rover Autobiography or Mercedes GLS",
    rate: 220,
    seats: 4,
    luggage: 4,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "7 Seater",
    desc: "Mercedes V-Class or EQV",
    rate: 200,
    seats: 6,
    luggage: 5,
    img: "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742", // ✅ fixed image
  },
  {
    name: "9 Seater",
    desc: "Mercedes Vito Tourer or similar",
    rate: 220,
    seats: 8,
    luggage: 6,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function CarList() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // ensure initial visibility
    gsap.set(cardsRef.current, { opacity: 1, y: 0 });

    // scroll animation (fade & lift)
    cardsRef.current.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section
      id="fleet"
      className="relative py-32 px-6 bg-black text-white overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-yellow-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 tracking-wider">
          Our Premium Fleet
        </h2>
        <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
          Discover our range of chauffeur-driven vehicles, tailored for every
          occasion.
        </p>

        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative rounded-2xl overflow-hidden border border-yellow-500/20 bg-white/5 backdrop-blur-xl hover:border-yellow-500/40 hover:shadow-yellow-500/20 transition-all duration-500"
            >
              {/* Car Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Car Info on image */}
                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-1">
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-300 italic">{car.desc}</p>
                </div>
              </div>

              {/* Details below image */}
              <div className="p-6 pt-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-yellow-400" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-yellow-400" />
                    <span>{car.luggage} Bags</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg">
                    from{" "}
                    <span className="text-white font-semibold">
                      £{car.rate}
                    </span>{" "}
                    <span className="text-gray-400 text-sm">per hour</span>
                  </p>
                  <button className="px-5 py-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
