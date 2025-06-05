const banners = [
  {
    title: "Summer Sale",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Electronics Deals",
    image: "https://images.unsplash.com/photo-1554676212-ebfccb4632d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "New Arrivals",
    image: "https://img.freepik.com/free-vector/stylish-new-arrival-sale-offer-background-brush-stroke-style_1017-49946.jpg?semt=ais_hybrid&w=740",
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
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {banner.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
