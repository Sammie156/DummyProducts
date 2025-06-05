const banners = [
  {
    title: "Summer Sale",
    rating: 4.5,
  },
  {
    title: "Electronics Deals",
    rating: 4.2,
  },
  {
    title: "New Arrivals",
    rating: 4.8,
  },
];

const BannerSlider = () => {
  return (
    <>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-custom {
          animation: slide 30s linear infinite;
        }
      `}</style>

      <div className="w-full bg-gray-900 py-6 overflow-hidden">
        <div className="flex animate-slide-custom gap-6 whitespace-nowrap">
          {[...banners, ...banners].map((banner, i) => (
            <div
              key={i}
              className="min-w-[300px] sm:min-w-[400px] rounded-lg overflow-hidden bg-white shadow-lg"
            >
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {banner.title}
                </h3>
                <p className="text-yellow-500 text-sm">
                  ⭐ {banner.rating} / 5
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
