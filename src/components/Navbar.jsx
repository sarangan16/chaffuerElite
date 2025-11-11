// src/components/Navbar.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Car, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linkRefs = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "bounce.out" }
    );

    const ctx = gsap.context(() => {
      // Scroll shadow
      ScrollTrigger.create({
        trigger: "body",
        start: "50px top",
        onEnter: () =>
          gsap.to(nav, {
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            duration: 0.3,
          }),
        onLeaveBack: () => gsap.to(nav, { boxShadow: "none", duration: 0.3 }),
      });

      // CTA pulse
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          scale: 1.05,
          boxShadow:
            "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const animateLink = (el, enter) => {
    gsap.to(el, {
      scale: enter ? 1.08 : 1,
      y: enter ? -2 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(el.querySelector(".underline"), {
      width: enter ? "100%" : "0%",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Cars", href: "#cars" },
    { label: "Contact", href: "#contact" },
  ];

  const phoneNumber = "+44 79 9009 0090";

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-xl"
          : "bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <a
          ref={logoRef}
          href="#home"
          className="flex items-center gap-2 group"
          onMouseEnter={() =>
            gsap.to(logoRef.current, { scale: 1.05, duration: 0.3 })
          }
          onMouseLeave={() =>
            gsap.to(logoRef.current, { scale: 1, duration: 0.3 })
          }
        >
          {/* Optional Concierge Icon (steering wheel or crown) */}

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            Crown Chauffeur
          </h1>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10 font-medium">
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              ref={(el) => (linkRefs.current[i] = el)}
              className={`relative text-lg transition-colors duration-300 ${
                scrolled
                  ? "text-gray-100 hover:text-yellow-400"
                  : "text-white hover:text-yellow-300"
              }`}
              onMouseEnter={(e) => animateLink(e.currentTarget, true)}
              onMouseLeave={(e) => animateLink(e.currentTarget, false)}
            >
              {item.label}
              <span
                className="underline absolute left-0 -bottom-1 h-0.5 bg-yellow-500 w-0 transition-all duration-300"
                aria-hidden
              />
            </a>
          ))}

          {/* CALL NOW */}
          <a
            ref={ctaRef}
            href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
            className="ml-6 flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 group"
          >
            <Phone className="w-5 h-5 group-hover:animate-pulse text-black" />
            <span className="text-sm md:text-base font-bold tracking-wide">
              {phoneNumber}
            </span>
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-white/20 transition"
        >
          {isOpen ? (
            <X
              size={28}
              className={scrolled ? "text-yellow-500" : "text-white"}
            />
          ) : (
            <Menu
              size={28}
              className={scrolled ? "text-yellow-500" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center space-y-5 py-6 font-medium text-gray-100">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg hover:text-yellow-400 transition"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Call Button */}
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
              <Phone className="w-5 h-5" />
              <span>{phoneNumber}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
