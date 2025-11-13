"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingForm from "./BookingForm";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const carRef = useRef(null);
  const ctaRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => animateHero(true));
      mm.add("(min-width: 768px)", () => animateHero(false));

      function animateHero(isMobile) {
        const lines = titleRef.current?.children;

        // Animate headline
        if (lines?.[0]) {
          gsap.fromTo(
            lines[0],
            { y: 120, opacity: 0, letterSpacing: "0.4em" },
            {
              y: 0,
              opacity: 1,
              letterSpacing: "0.08em",
              duration: 1.8,
              ease: "power3.out",
              delay: 0.6,
            }
          );
        }

        // Animate tagline
        if (lines?.[1]) {
          gsap.fromTo(
            lines[1],
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: "power3.out",
              delay: 1,
            }
          );
        }

        // Car animation
        gsap.fromTo(
          carRef.current,
          {
            x: isMobile ? 500 : 1000,
            opacity: 0,
            rotation: isMobile ? -10 : -15,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 2,
            ease: "power3.out",
            delay: 1,
          }
        );

        // Parallax tilt while scrolling
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const tiltY = isMobile
              ? self.progress * 24 - 12
              : self.progress * 48 - 24;
            const tiltX = self.progress * 8;
            gsap.to(carRef.current, {
              rotationY: tiltY,
              rotationX: tiltX,
              ease: "none",
              overwrite: "auto",
            });
          },
        });

        // CTA glow animation
        gsap.to(ctaRef.current, {
          scale: 1.03,
          boxShadow:
            "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Form fade-in
        gsap.fromTo(
          formRef.current,
          { y: 100, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.4)",
            delay: 1.6,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-[120px] md:pt-[160px] pb-32 md:pb-44 overflow-visible"
      style={{ scrollMarginTop: "100px", backgroundColor: "#0B1D3A" }}
    >
      {/* Soft glowing background lights */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/25 via-amber-500/10 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-yellow-500/25 via-amber-500/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Hero text & car */}
      <div className="relative z-20 w-full max-w-7xl px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={titleRef} className="space-y-8 text-center lg:text-left">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-widest uppercase">
            Chauffeur Concierge
          </h2>

          <div className="h-1.5 w-40 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 mx-auto lg:mx-0 rounded-full" />

          <p className="text-lg sm:text-xl text-gray-200 font-light tracking-wide max-w-xl mx-auto lg:mx-0">
            <span className="text-yellow-400 font-semibold">Door-to-door</span>{" "}
            • Professional driver • 24/7 • Full discretion
          </p>

          <button
            ref={ctaRef}
            onClick={() => {
              const form = formRef.current;
              if (form) {
                const yOffset = -120;
                const y =
                  form.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Request Chauffeur
          </button>
        </div>

        <div className="flex justify-center items-end">
          <img
            ref={carRef}
            src="/images/hero.png"
            alt="Luxury Chauffeur Car"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.85))" }}
            onError={(e) => {
              e.target.src = "https://i.imgur.com/5Qv3n8k.png";
            }}
          />
        </div>
      </div>

      {/* Booking Form section */}
      <div
        ref={formRef}
        className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 mt-24 md:mt-40"
      >
        {/* Cleaner, thinner padding — form feels bigger */}
        <div className="border border-yellow-500/50 rounded-2xl p-3 sm:p-4 md:p-5 bg-[#13264C]/50 backdrop-blur-md shadow-xl w-full">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
