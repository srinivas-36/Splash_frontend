
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const heroImages = [
  "/images/hero-campaign-01.jpg",
  "/images/hero-campaign-02.jpg",
  "/images/hero-campaign-03.jpg",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setScrolledPastHero(heroBottom < window.innerHeight - 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-white pt-12 lg:pt-14"
    >
      {/* Top Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-2 lg:py-3 text-center relative z-10">
        <h1 className="text-[1.3rem] lg:text-[1.6rem] font-bold my-4 text-transparent bg-clip-text bg-gradient-to-br from-[#5533FF] via-[#863FFF] to-[#C44DFF] animate-slideFadeIn">
          CAMPAIGN READY VISUALS, WITHOUT THE SHOOT
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-0">
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-gradient-to-br from-[#5533FF] via-[#863FFF] to-[#C44DFF] text-white font-medium rounded-xl hover:bg-purple-600 transition-colors sm:flex-1 sm:max-w-[180px] animate-slideFadeIn delay-100"
          >
            Try Splash AI
            <ChevronRight className="ml-2" size={20} />
          </Link>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 rounded text-gray-800 hover:bg-gray-100 transition-colors sm:flex-1 sm:max-w-[180px] animate-slideFadeIn delay-200"
          >
            See Showcase
          </a>
        </div>
      </div>

      {/* Image Carousel in Middle */}
      <div className="relative h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform-gpu ${index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
              } will-change-transform will-change-opacity`}
          >
            <img
              src={image}
              alt={`Luxury jewelry campaign ${index + 1}`}
              className="w-full h-full object-cover rounded-xl shadow-lg"
              draggable={false}
            />
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentImage ? "w-8 bg-[#A64DFF]" : "w-1 bg-[#A64DFF]/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Text (smaller size) */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-3 text-center relative z-10">
        <p className="text-[0.95rem] lg:text-[1.1rem] max-w-2xl mx-auto text-black animate-slideFadeIn">
          Moodboard to model shots to perfect retouches—{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#6344ff] to-[#a34bff]">
            Splash AI Studio
          </span>{" "}
          turns your concepts into stunning, shoppable imagery.
        </p>
      </div>

      {/* Fixed Bottom Glassy Bar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-in-out ${scrolledPastHero ? "opacity-100 translate-y-0 animate-slideUpIn" : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg whitespace-nowrap border border-white/20">
          <span className="text-[0.95rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5533FF] via-[#863FFF] to-[#C44DFF] animate-slideFadeIn">
            CAMPAIGN READY VISUALS, WITHOUT THE SHOOT
          </span>
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-gradient-to-br from-[#5533FF] via-[#863FFF] to-[#C44DFF] text-white font-medium rounded-xl px-3 py-2 hover:bg-purple-600 transition-colors animate-slideFadeIn delay-100"
          >
            Try Splash AI
            <ChevronRight className="ml-1" size={16} />
          </Link>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center px-3 py-2 border-2 border-gray-300 rounded text-gray-800 hover:bg-gray-100 transition-colors animate-slideFadeIn delay-200"
          >
            See Showcase
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideFadeIn {
          animation: slideFadeIn 0.8s ease-out forwards;
        }

        @keyframes slideUpIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUpIn {
          animation: slideUpIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
