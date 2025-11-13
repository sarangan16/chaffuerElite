"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Detect scroll for navbar shadow / background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intro animation
  useEffect(() => {
    const nav = navRef.current;
    gsap.fromTo(
      nav,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
    );

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "50px top",
        onEnter: () =>
          gsap.to(nav, {
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            duration: 0.3,
          }),
        onLeaveBack: () => gsap.to(nav, { boxShadow: "none", duration: 0.3 }),
      });
    });
    return () => ctx.revert();
  }, []);

  const menuItems = [
    { label: "HOME", href: "#hero" },
    { label: "CARS", href: "#fleet" },
    { label: "WHY US", href: "#why-choose-us" },
  ];

  const phoneNumber = "+44 12 3456 7890";

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 overflow-hidden ${
        scrolled
          ? "bg-[#1B2A52]/95 backdrop-blur-md shadow-xl"
          : "bg-[#1B2A52]/70 backdrop-blur-sm"
      }`}
    >
      {/* Outer wrapper ensures no horizontal scroll */}
      <div className="w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          {/* LOGO */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("#hero");
            }}
            className="flex items-center gap-2"
          >
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent whitespace-nowrap">
              Crown Chauffeur
            </h1>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-12 font-medium text-gray-100">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="relative text-lg hover:text-yellow-400 transition-colors duration-300"
                onClick={() => handleScroll(item.href)}
              >
                {item.label}
              </button>
            ))}
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
              className="ml-6 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:shadow-yellow-400/50 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
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
              <X className="text-yellow-500" size={28} />
            ) : (
              <Menu className="text-white" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed left-0 top-[64px] w-screen overflow-hidden bg-[#1B2A52]/95 backdrop-blur-md shadow-2xl transition-all duration-300 ${
          isOpen
            ? "max-h-[calc(100vh-64px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Inner container */}
        <div className="flex flex-col items-center space-y-3 py-4 font-medium text-gray-100 px-4 overflow-x-hidden">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="text-lg w-full text-left hover:text-yellow-400 transition"
              onClick={() => handleScroll(item.href)}
            >
              {item.label}
            </button>
          ))}

          <a
            href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:scale-105 transition"
          >
            <Phone className="w-5 h-5" />
            <span>{phoneNumber}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
