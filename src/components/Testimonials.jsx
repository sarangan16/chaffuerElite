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
    <section className="relative bg-white py-28">
      {/* Subtle decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-200/50 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-gray-200/40 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 text-lg mb-16">
          Trusted by clients who expect the best in luxury travel.
        </p>

        {/* Carousel */}
        <div className="relative h-56 md:h-64">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              <p className="text-gray-800 text-lg md:text-xl italic mb-4 md:mb-6 max-w-xl leading-relaxed">
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
              <p className="font-semibold text-gray-900">{t.name}</p>
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
