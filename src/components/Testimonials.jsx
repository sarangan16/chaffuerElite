// src/components/Testimonials.jsx
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Hans Müller",
      text: "Exceptional experience — every detail was handled with precision and professionalism. Truly first-class service.",
      rating: 5,
    },
    {
      name: "Anna Schmidt",
      text: "Impeccable vehicles and courteous chauffeurs. I felt valued from booking to arrival. Highly recommended.",
      rating: 5,
    },
    {
      name: "Thomas Weber",
      text: "Luxury, comfort, and punctuality at its best. The best chauffeur service I’ve ever used in the UK.",
      rating: 5,
    },
    {
      name: "James Parker",
      text: "Discreet, punctual, and incredibly comfortable. Perfect for business and airport transfers alike.",
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative bg-[#0B1D3A] py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2147] via-[#0B1D3A] to-[#091729]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a3a6e22_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-[0.3em] uppercase text-white">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 text-sm mb-12 tracking-wide">
          Trusted by clients who expect the best in luxury travel.
        </p>

        {/* Carousel */}
        <div className="relative min-h-[200px] md:min-h-[220px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              <p className="text-gray-300 text-base italic mb-4 md:mb-6 max-w-xl leading-relaxed">
                “{t.text}”
              </p>
              <div className="flex justify-center mb-2">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500 mx-0.5"
                  />
                ))}
              </div>
              <p className="font-semibold text-yellow-400 text-sm tracking-widest">
                {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === i ? "bg-yellow-500 w-4 h-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
