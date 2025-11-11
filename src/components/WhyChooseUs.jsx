// src/components/WhyChooseUs.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Plane, PoundSterling } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Clock className="w-8 h-8 text-amber-600" />,
    title: "24/7 Concierge",
    desc: "Round-the-clock English & German support for your comfort and reliability.",
  },
  {
    icon: <Shield className="w-8 h-8 text-amber-600" />,
    title: "Full Insurance",
    desc: "Enjoy total peace of mind with full coverage and zero excess on all rides.",
  },
  {
    icon: <Plane className="w-8 h-8 text-amber-600" />,
    title: "Airport VIP",
    desc: "Meet & greet, flight tracking, and professional airport transfers across the UK.",
  },
  {
    icon: <PoundSterling className="w-8 h-8 text-amber-600" />,
    title: "Transparent Pricing",
    desc: "No hidden fees — fixed, all-inclusive GBP rates for every journey.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      y: 60,
      stagger: 0.2,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/60 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/80 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-amber-400 to-gray-900 bg-clip-text text-transparent">
          Why Choose Us
        </h2>
        <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
          Experience exceptional comfort, reliability, and professionalism in
          every journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-amber-100/80 transition-all duration-500 p-8 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100 transition-all duration-500 shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
