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
            { y: 40, opacity: 0, letterSpacing: "0.3em" },
            {
              y: 0,
              opacity: 1,
              letterSpacing: "0.25em",
              duration: 1.4,
            },
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
            },
          );
        }

        // Car animation

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
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Full screen video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0B1D3A]/50" />
        </div>

        {/* Hero text — centered on top of video */}
        <div
          ref={titleRef}
          className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center space-y-6 pt-32"
        >
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase font-medium">
            UK Premium Chauffeur Service
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[0.15em] uppercase leading-tight">
            Travel in{" "}
            <span className="font-semibold text-yellow-400">Style</span>
          </h2>

          <p className="text-gray-300 font-light tracking-wide max-w-xl mx-auto text-base">
            Airport transfers & corporate travel across the UK.{" "}
            <span className="text-yellow-400">Available 24/7.</span>
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
            className="inline-block px-8 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black text-sm font-semibold rounded-full tracking-widest hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300"
          >
            Book Your Ride
          </button>
        </div>
      </section>

      {/* Booking Form */}
      <div
        ref={formRef}
        className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-16 pb-20"
      >
        <div className="border border-yellow-500/30 rounded-2xl p-4 md:p-6 bg-[#0B1D3A]/70 backdrop-blur-md shadow-2xl">
          <BookingForm />
        </div>
      </div>
    </>
  );
}
