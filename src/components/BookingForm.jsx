"use client";

import { useState, useEffect } from "react";
import { Plane, ArrowRightLeft, Phone } from "lucide-react";
import { format } from "date-fns";
import { AIRPORT_LOCATIONS } from "../lib/fees";
import { calculateFees } from "../lib/calculateFees";
import UKAutocomplete from "./UKAutocomplete";

const CAR_CLASSES = [
  { name: "Saloon", rate: 120, desc: "Mercedes E-Class" },
  { name: "Executive", rate: 180, desc: "Mercedes S-Class" },
  { name: "Luxury", rate: 250, desc: "Range Rover / Bentley" },
  { name: "7 Seater", rate: 200, desc: "Mercedes V-Class" },
];

export default function BookingForm() {
  const [bookingType, setBookingType] = useState("airport");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [direction, setDirection] = useState("pickup");
  const [carClass, setCarClass] = useState("Executive");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(format(new Date(), "HH:mm"));
  const [fees, setFees] = useState({});

  useEffect(() => setFees(calculateFees(pickup, dropoff)), [pickup, dropoff]);
  useEffect(() => {
    setPickup("");
    setDropoff("");
  }, [bookingType, direction]);

  const baseRate = getRate(carClass) * 1.5;
  const totalFees = Object.values(fees).reduce((a, b) => a + b, 0);
  const grandTotal = baseRate + totalFees;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nTotal: £${grandTotal.toFixed(2)}`);
  };

  return (
    <section className="py-10 px-4 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-500 to-amber-400 bg-clip-text text-transparent">
          Book Your Ride
        </h2>

        {/* Journey Type */}
        <div>
          <label className="text-gray-200 font-semibold text-sm">
            Journey Type
          </label>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={() => setBookingType("airport")}
              className={`flex-1 p-3 rounded-xl font-semibold border text-sm transition ${
                bookingType === "airport"
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-transparent border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Plane className="inline-block w-4 h-4 mr-1" />
              Airport
            </button>
            <button
              type="button"
              onClick={() => setBookingType("oneway")}
              className={`flex-1 p-3 rounded-xl font-semibold border text-sm transition ${
                bookingType === "oneway"
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-transparent border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <ArrowRightLeft className="inline-block w-4 h-4 mr-1" />
              One Way
            </button>
          </div>
        </div>

        {/* Transfer Type (Airport Only) */}
        {bookingType === "airport" && (
          <div>
            <label className="text-gray-200 font-semibold text-sm">
              Transfer Type
            </label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-1 cursor-pointer text-gray-300 text-sm">
                <input
                  type="radio"
                  name="direction"
                  value="pickup"
                  checked={direction === "pickup"}
                  onChange={() => setDirection("pickup")}
                  className="accent-yellow-500"
                />
                Pickup
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-gray-300 text-sm">
                <input
                  type="radio"
                  name="direction"
                  value="drop"
                  checked={direction === "drop"}
                  onChange={() => setDirection("drop")}
                  className="accent-yellow-500"
                />
                Drop
              </label>
            </div>
          </div>
        )}

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bookingType === "airport" ? (
            direction === "pickup" ? (
              <>
                <UKAutocomplete
                  label="Select Airport"
                  value={pickup}
                  onSelect={setPickup}
                  suggestions={AIRPORT_LOCATIONS}
                />
                <UKAutocomplete
                  label="Drop-off Location"
                  value={dropoff}
                  onSelect={setDropoff}
                  suggestions={[]}
                />
              </>
            ) : (
              <>
                <UKAutocomplete
                  label="Pick-up Location"
                  value={pickup}
                  onSelect={setPickup}
                  suggestions={[]}
                />
                <UKAutocomplete
                  label="Select Airport"
                  value={dropoff}
                  onSelect={setDropoff}
                  suggestions={AIRPORT_LOCATIONS}
                />
              </>
            )
          ) : (
            <>
              <UKAutocomplete
                label="Pick-up Location"
                value={pickup}
                onSelect={setPickup}
                suggestions={[]}
              />
              <UKAutocomplete
                label="Drop-off Location"
                value={dropoff}
                onSelect={setDropoff}
                suggestions={[]}
              />
            </>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-gray-200 font-semibold text-sm">Date</label>
            <input
              type="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 text-white text-sm focus:bg-white/10 transition"
            />
          </div>
          <div>
            <label className="text-gray-200 font-semibold text-sm">Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 text-white text-sm focus:bg-white/10 transition"
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
        </div>

        {/* Vehicle Selection */}
        <div>
          <label className="text-gray-200 font-semibold text-sm">Vehicle</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
            {CAR_CLASSES.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setCarClass(c.name)}
                className={`p-3 rounded-xl border text-left text-sm transition ${
                  carClass === c.name
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                }`}
              >
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs opacity-80">{c.desc}</div>
                <div className="text-sm mt-0.5">£{c.rate}/hr</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fare Summary */}
        <div className="p-4 rounded-2xl text-white border border-yellow-600/20 bg-white/5 space-y-1">
          <div className="flex justify-between text-base font-semibold">
            <span>Base Fare</span>
            <span>£{baseRate.toFixed(2)}</span>
          </div>
          {fees.congestion && (
            <div className="flex justify-between text-xs opacity-80">
              <span>Congestion Charge</span>
              <span>£{fees.congestion.toFixed(2)}</span>
            </div>
          )}
          {fees.ulez && (
            <div className="flex justify-between text-xs opacity-80">
              <span>ULEZ Charge</span>
              <span>£{fees.ulez.toFixed(2)}</span>
            </div>
          )}
          {fees.airport && (
            <div className="flex justify-between text-xs opacity-80">
              <span>Airport Fee</span>
              <span>£{fees.airport.toFixed(2)}</span>
            </div>
          )}
          <hr className="border-white/10 my-1" />
          <div className="flex justify-between text-lg font-bold text-yellow-400">
            <span>Total</span>
            <span>£{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition text-sm"
        >
          <Phone className="w-4 h-4" />
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

function getRate(name) {
  const car = CAR_CLASSES.find((c) => c.name === name);
  return car ? car.rate : 120;
}
