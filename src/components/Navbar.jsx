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
  const linkRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Smooth scroll for desktop & mobile links
  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1B2A52]/95 backdrop-blur-md shadow-xl"
          : "bg-[#1B2A52]/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* LOGO */}
        <a
          href="#hero"
          onClick={(e) => handleScroll(e, "#hero")}
          className="flex items-center gap-2"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            ChaffuerElite
          </h1>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-12 font-medium text-gray-100">
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              ref={(el) => (linkRefs.current[i] = el)}
              onClick={(e) => handleScroll(e, item.href)}
              className="relative text-lg hover:text-yellow-400 transition-colors duration-300"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* CALL NOW BUTTON */}
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

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#1B2A52]/95 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-100">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-lg hover:text-yellow-400 transition"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Call Button */}
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:scale-105 transition"
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
