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
      className="relative bg-[#0B1D3A] py-32 px-6"
    >
      <div className="max-2-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-yellow-500 text-xs tracking-[0.4em] uppercase mb-4">
            Experience exceptional comfort, reliability, and professionalism in
            every journey.
          </p>
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase text-white">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="flex flex-col items-start p-8 rounded-2xl border border-white/8 bg-white/3 hover:border-yellow-500/30 hover:bg-white/5 transition-all duration-500"
              >
                {/* Icon wrapper */}
                <div className="mb-6 p-3 rounded-xl bg-yellow-500/10">
                  {/* Icon color changes on hover */}
                  <Icon className="w-6 h-6 text-yellow-400" />
                </div>

                <h3 className="text-sm font-semibold text-white mb-3 tracking-widest uppercase">
                  {f.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
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
