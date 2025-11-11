// src/components/UKAutocomplete.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

export default function UKAutocomplete({
  name,
  placeholder,
  onSelect,
  value = "",
  setValue,
}) {
  const [q, setQ] = useState(value);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const fetchSuggestions = debounce(async (term) => {
    if (!term || term.length < 2) {
      setItems([]);
      return;
    }
    try {
      const r = await fetch(
        `https://api.postcodes.io/postcodes?query=${encodeURIComponent(
          term
        )}&limit=10`
      );
      const json = await r.json();
      const results = (json.result || []).map((p) => ({
        id: p.postcode,
        display: p.postcode,
        postcode: p.postcode,
        label: `${p.postcode} • ${p.admin_district || p.region}`,
      }));
      setItems(results);
      setOpen(true);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(q);
    return () => fetchSuggestions.cancel();
  }, [q]);

  // close when clicked outside
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <input
        name={name}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          if (setValue) setValue(name, e.target.value);
        }}
        onFocus={() => q.length > 0 && setOpen(true)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-white text-sm placeholder-gray-400"
        autoComplete="off"
      />

      {open && items.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/20 rounded-xl shadow p-2 max-h-56 overflow-auto">
          {items.map((it) => (
            <li
              key={it.id}
              className="p-2 rounded hover:bg-white/10 cursor-pointer text-sm"
              onClick={() => {
                setQ(it.label);
                setOpen(false);
                if (setValue) setValue(name, it.label);
                if (onSelect) onSelect(it.label, it.postcode, it);
              }}
            >
              {it.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
