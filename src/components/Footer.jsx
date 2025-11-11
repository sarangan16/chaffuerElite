// src/components/Footer.jsx
"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white relative overflow-hidden">
      {/* Gradient light accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-yellow-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo / Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-yellow-400 uppercase tracking-wider">
              Chauffeur UK
            </h2>
            <p className="text-gray-400 max-w-sm">
              Professional chauffeur services across the UK. Luxury, comfort,
              and discretion guaranteed.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>+44 1234 567890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span>info@chauffeuruk.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>123 Luxury St, London, UK</span>
            </div>
          </div>

          {/* Quick Links / Optional */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#fleet" className="hover:text-yellow-400 transition">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-yellow-400 transition">
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="#whychooseus"
                  className="hover:text-yellow-400 transition"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-500/30 mt-12 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Chauffeur UK. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
