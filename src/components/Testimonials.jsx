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
    }, 6000); // 6s per slide
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative bg-white py-32 overflow-hidden">
      {/* Gradient background accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/80 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-amber-400 to-gray-900 bg-clip-text text-transparent">
          Client Testimonials
        </h2>
        <p className="text-gray-600 text-lg mb-20 max-w-2xl mx-auto">
          Stories from those who trusted us to redefine their travel experience.
        </p>

        {/* Testimonial Carousel */}
        <div className="relative h-64 md:h-72">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              <p className="text-gray-700 text-xl md:text-2xl italic mb-8 leading-relaxed max-w-2xl">
                “{t.text}”
              </p>

              <div className="flex justify-center mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>

              <p className="font-semibold text-gray-900 text-lg">— {t.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === i ? "bg-amber-500 w-5" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
