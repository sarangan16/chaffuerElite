export default function Process() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-6xl font-black mb-20">Car Rental Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              num: "01",
              title: "Choose A Car",
              desc: "View our range of cars, find your perfect car for the coming days.",
            },
            {
              num: "02",
              title: "Come In Contact",
              desc: "Our advisor team is ready to help you with the booking process or any questions.",
            },
            {
              num: "03",
              title: "Enjoy Driving",
              desc: "Receive the key and enjoy your car. We treat all our cars with respect.",
            },
          ].map((s) => (
            <div key={s.num}>
              <div className="text-9xl font-black text-red-600/10 mb-8">
                {s.num}
              </div>
              <h3 className="text-3xl font-bold mb-6">{s.title}</h3>
              <p className="text-gray-600 text-lg max-w-sm mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-gray-600 text-lg">
          If you've never rented a car before, we'll guide you through the
          process.
        </p>
        <button className="mt-10 px-16 py-5 bg-red-600 text-white text-xl font-bold hover:bg-red-700 transition">
          Explore
        </button>
      </div>
    </section>
  );
}
