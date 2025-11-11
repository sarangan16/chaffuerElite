"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  Car,
  Phone,
  Plane,
  ArrowRightLeft,
  Clock3,
} from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import UKAutocomplete from "./UKAutocomplete";
import {
  ZONE_FEES,
  AIRPORT_FEES,
  CONGESTION_ZONE_POSTCODES,
  AIRPORT_POSTCODES,
} from "../lib/fees";

// === CONFIG ===
const BOOKING_TYPES = [
  { id: "oneway", label: "One Way", icon: ArrowRightLeft },
  { id: "return", label: "Return", icon: ArrowRightLeft },
  { id: "hourly", label: "Hourly Hire", icon: Clock3 },
  { id: "airport", label: "Airport Transfer", icon: Plane },
];

const CAR_CLASSES = [
  { name: "Saloon", rate: 120, desc: "Mercedes E-Class" },
  { name: "Executive", rate: 180, desc: "Mercedes S-Class" },
  { name: "Luxury", rate: 180, desc: "Mercedes S-Class" },
  { name: "Suv", rate: 180, desc: "Mercedes S-Class" },
  { name: "7 Seater", rate: 180, desc: "Mercedes S-Class" },
  { name: "9 Seater", rate: 200, desc: "Mercedes V-Class" },
];

// === FORM SCHEMA ===
const schema = z.object({
  bookingType: z.string(),
  pickup: z.string().min(3, "Pick-up required"),
  dropoff: z.string().optional(),
  startDateTime: z.string(),
  duration: z.string().optional(),
  carClass: z.string(),
});

export default function BookingForm() {
  const [bookingType, setBookingType] = useState("oneway");
  const [carClass, setCarClass] = useState("Executive");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(format(new Date(), "HH:mm"));
  const [duration, setDuration] = useState("4");
  const [openSection, setOpenSection] = useState("type");
  const [fees, setFees] = useState({ congestion: 0, airport: 0 });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bookingType,
      pickup: "",
      dropoff: "",
      startDateTime: "",
      duration: "4",
      carClass,
    },
  });

  const pickup = watch("pickup");
  const dropoff = watch("dropoff");

  // === Update form values
  useEffect(() => {
    const datetime = `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`;
    setValue("startDateTime", datetime);
    setValue("bookingType", bookingType);
    setValue("carClass", carClass);
    if (bookingType === "hourly") setValue("duration", duration);
  }, [selectedDate, selectedTime, bookingType, carClass, duration]);

  // === Fee calculation
  useEffect(() => {
    const pc1 = extractPostcode(pickup);
    const pc2 = extractPostcode(dropoff);
    const airport = detectAirport(pc1) || detectAirport(pc2);
    const inCC = [pc1, pc2].some((pc) =>
      CONGESTION_ZONE_POSTCODES.some((z) => pc?.startsWith(z))
    );

    setFees({
      congestion: inCC ? ZONE_FEES.CONGESTION_CHARGE : 0,
      airport: airport ? AIRPORT_FEES[airport]?.dropoff || 0 : 0,
    });
  }, [pickup, dropoff]);

  const totalFees = Object.values(fees).reduce((a, b) => a + b, 0);
  const baseRate =
    bookingType === "hourly"
      ? getRate(carClass) * parseInt(duration)
      : getRate(carClass) * 1.5;
  const grandTotal = baseRate + totalFees;

  const onSubmit = (data) => {
    alert(`Booking Confirmed!\nTotal £${grandTotal.toFixed(2)}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10"
    >
      {/* Step 1: Journey Type */}
      <Section
        title="Journey Type"
        icon={<ArrowRightLeft className="w-4 h-4 text-yellow-500" />}
        open={openSection === "type"}
        onToggle={() => setOpenSection(openSection === "type" ? null : "type")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {BOOKING_TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setBookingType(t.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${
                  bookingType === t.id
                    ? "bg-yellow-600 text-black border-yellow-600"
                    : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{t.label}</span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Step 2: Locations */}
      <Section
        title="Locations"
        icon={<MapPin className="w-4 h-4 text-yellow-500" />}
        open={openSection === "loc"}
        onToggle={() => setOpenSection(openSection === "loc" ? null : "loc")}
      >
        <div className="space-y-3">
          <UKAutocomplete
            label="Pick-up"
            value={pickup}
            onSelect={(v) => setValue("pickup", v)}
          />
          {bookingType !== "hourly" && (
            <UKAutocomplete
              label={
                bookingType === "return"
                  ? "Drop-off (same as pickup)"
                  : "Drop-off"
              }
              value={dropoff}
              onSelect={(v) => setValue("dropoff", v)}
            />
          )}
        </div>
      </Section>

      {/* Step 3: Date & Time */}
      <Section
        title="Date & Time"
        icon={<Calendar className="w-4 h-4 text-yellow-500" />}
        open={openSection === "time"}
        onToggle={() => setOpenSection(openSection === "time" ? null : "time")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            min={format(new Date(), "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white text-sm"
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white text-sm"
          >
            {Array.from({ length: 48 }, (_, i) => {
              const h = String(Math.floor(i / 2)).padStart(2, "0");
              const m = i % 2 === 0 ? "00" : "30";
              return (
                <option key={`${h}:${m}`} value={`${h}:${m}`}>
                  {h}:{m}
                </option>
              );
            })}
          </select>
        </div>
      </Section>

      {/* Step 4: Car Selection */}
      <Section
        title="Vehicle"
        icon={<Car className="w-4 h-4 text-yellow-500" />}
        open={openSection === "car"}
        onToggle={() => setOpenSection(openSection === "car" ? null : "car")}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {CAR_CLASSES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setCarClass(c.name)}
              className={`p-3 rounded-xl border transition ${
                carClass === c.name
                  ? "bg-yellow-600 text-black border-yellow-600"
                  : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
              }`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs opacity-80">{c.desc}</div>
              <div className="text-sm mt-1">£{c.rate}/hr</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Step 5: Summary */}
      <Section
        title="Summary"
        icon={<Phone className="w-4 h-4 text-yellow-500" />}
        open={openSection === "summary"}
        onToggle={() =>
          setOpenSection(openSection === "summary" ? null : "summary")
        }
      >
        <div className="bg-gradient-to-r from-yellow-600 to-amber-600 p-4 rounded-xl text-black">
          <div className="flex justify-between text-lg font-bold">
            <span>Estimated Total</span>
            <span>£{grandTotal.toFixed(2)}</span>
          </div>
          <p className="text-xs mt-1">All charges included</p>
        </div>
        <button
          type="submit"
          className="w-full mt-3 bg-yellow-500 text-black py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-yellow-600"
        >
          <Phone className="w-5 h-5" />
          Confirm Booking
        </button>
      </Section>
    </form>
  );
}

// === Section Accordion ===
function Section({ title, icon, open, onToggle, children }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-white/5 text-white text-sm font-semibold"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="p-4 bg-white/5">{children}</div>}
    </div>
  );
}

// === Helpers ===
function extractPostcode(address) {
  const match = address?.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\b/i);
  return match ? match[0].toUpperCase() : null;
}

function detectAirport(pc) {
  if (!pc) return null;
  for (const [name, pcs] of Object.entries(AIRPORT_POSTCODES)) {
    if (pcs.some((p) => pc.startsWith(p))) return name;
  }
  return null;
}

function getRate(name) {
  const car = CAR_CLASSES.find((c) => c.name === name);
  return car ? car.rate : 120;
}
