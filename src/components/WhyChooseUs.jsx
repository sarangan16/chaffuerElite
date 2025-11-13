"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Plane, PoundSterling } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Clock,
    title: "24/7 Concierge",
    desc: "Round-the-clock English & German support for your comfort and reliability.",
  },
  {
    icon: Shield,
    title: "Full Insurance",
    desc: "Enjoy total peace of mind with full coverage and zero excess on all rides.",
  },
  {
    icon: Plane,
    title: "Airport VIP",
    desc: "Meet & greet, flight tracking, and professional airport transfers across the UK.",
  },
  {
    icon: PoundSterling,
    title: "Transparent Pricing",
    desc: "No hidden fees — fixed, all-inclusive GBP rates for every journey.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative bg-gradient-to-b from-[#1B2A52] to-[#15203A] py-28 overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-yellow-500/20 to-transparent rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
          Why Choose Us
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-16 max-w-3xl mx-auto leading-relaxed">
          Experience exceptional comfort, reliability, and professionalism in
          every journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon; // dynamic icon
            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative bg-[#1B2A52]/30 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg hover:shadow-yellow-500/20 transition-all duration-500 p-8 flex flex-col items-center text-center"
              >
                {/* Icon wrapper */}
                <div className="mb-5 p-5 rounded-full bg-yellow-500/20 group-hover:bg-white transition-all duration-300 flex items-center justify-center shadow-inner transform group-hover:scale-110">
                  {/* Icon color changes on hover */}
                  <Icon className="w-10 h-10 text-yellow-400 group-hover:text-black transition-colors duration-300" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
