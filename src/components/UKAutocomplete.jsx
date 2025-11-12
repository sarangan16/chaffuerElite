"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

export default function UKAutocomplete({
  label,
  value,
  onSelect,
  suggestions = [],
}) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // 🔄 Reset when suggestion set changes
  useEffect(() => {
    setQuery("");
    onSelect("");
  }, [suggestions]);

  // 🪄 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered =
    query.length > 0
      ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      : suggestions;

  const handleSelect = (val) => {
    onSelect(val);
    setQuery(val);
    setOpen(false);
  };

  const clearInput = () => {
    setQuery("");
    onSelect("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Enter location"
          className="w-full px-3 py-2 pr-8 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400"
        />
        {query ? (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        ) : (
          <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-yellow-400" />
        )}
      </div>

      {open && suggestions.length > 0 && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-[#1F1F1F] border border-white/10 rounded-lg max-h-52 overflow-y-auto shadow-lg">
          {filtered.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 cursor-pointer hover:bg-yellow-500/20 text-sm text-gray-200 flex items-center gap-2"
            >
              ✈️ <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
