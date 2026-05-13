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
    amenities: ["Wi-Fi", "Phone Charger", "Bottled Water"],
    features: ["Spacious legroom", "Comfortable ride"],
    img: "https://images.unsplash.com/photo-1629019879059-2a0345f93aea?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Executive",
    desc: "Mercedes S-Class or BMW 7 Series",
    rate: 180,
    seats: 3,
    luggage: 2,
    amenities: ["Wi-Fi", "Phone Charger", "Bottled Water"],
    features: ["Luxury interior", "Silent ride"],
    img: "https://images.unsplash.com/photo-1694895996049-f9e356afddd8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Luxury",
    desc: "Bentley Flying Spur or Range Rover Vogue",
    rate: 250,
    seats: 3,
    luggage: 2,
    amenities: ["Wi-Fi", "Mini Bar", "Bottled Water"],
    features: ["Spacious legroom", "Premium entertainment system"],
    img: "https://images.unsplash.com/photo-1679506640617-e429ddc31e52?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "SUV",
    desc: "Range Rover Autobiography or Mercedes GLS",
    rate: 220,
    seats: 4,
    luggage: 4,
    amenities: ["Wi-Fi", "Phone Charger", "Bottled Water"],
    features: ["Spacious boot", "Comfortable ride"],
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "7 Seater",
    desc: "Mercedes V-Class or EQV",
    rate: 200,
    seats: 6,
    luggage: 5,
    amenities: ["Wi-Fi", "Phone Charger"],
    features: ["Spacious interior", "Family-friendly"],
    img: "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742",
  },
  {
    name: "9 Seater",
    desc: "Mercedes Vito Tourer or similar",
    rate: 220,
    seats: 8,
    luggage: 6,
    amenities: ["Wi-Fi", "Phone Charger"],
    features: ["Spacious interior", "Perfect for groups"],
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function CarList() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // initial visibility
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
    <section id="fleet" className="bg-[#0B1D3A] py-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-yellow-500 text-xs tracking-[0.4em] uppercase mb-4">
            Travel in Comfort
          </p>
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase text-white">
            Our Premium Fleet
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group rounded-2xl overflow-hidden border border-white/8 bg-white/3 hover:border-yellow-500/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-sm font-semibold text-yellow-400 tracking-widest uppercase">
                    {car.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 italic">
                    {car.desc}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                {/* Seats & Bags */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-yellow-400" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} className="text-yellow-400" />
                    <span>{car.luggage} Bags</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {car.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs text-yellow-400/80 bg-yellow-500/10 px-3 py-1 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                  <span className="text-gray-500 text-xs">from</span>
                  <span className="text-white font-semibold">
                    £{car.rate}{" "}
                    <span className="text-gray-500 text-xs font-normal">
                      /hr
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
