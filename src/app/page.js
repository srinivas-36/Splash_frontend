
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ProductChapter from "@/components/home/ProductChapter";
import FeatureGrid from "@/components/home/FeatureGrid";
import BeforeAfter from "@/components/home/BeforeAfter";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/home/Footer";
const Home = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if user is already authenticated
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // If authenticated, don't render the home page (redirect will happen)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />

      {/* Product Story Chapters */}
      <div id="product">
        <ProductChapter
          title="Start with a spark."
          description="Upload moodboards, pick styles, and define your brand feel. Our AI understands luxury aesthetics and translates your vision into precise creative direction."
          imageSrc="/images/chapter-brief.jpg"
          imageAlt="Luxury jewelry design moodboard with textures and references"
          imagePosition="right"
        />

        <ProductChapter
          title="Cast the perfect face."
          description="Choose AI models or upload approved talent—control poses, angles, and expressions. Diverse representation with beauty-grade lighting that makes your jewelry shine."
          imageSrc="/images/chapter-model.jpg"
          imageAlt="Professional model portrait for jewelry campaigns"
          imagePosition="left"
        />

        <ProductChapter
          title="Your pieces, flawlessly rendered."
          description="Import SKUs and we preserve every detail—metal sheen, stone fire, and micro-details. From prongs to pavé, accuracy that rivals traditional photography."
          imageSrc="/images/chapter-product.jpg"
          imageAlt="Macro close-up of luxury diamond ring"
          imagePosition="right"
        />

        <ProductChapter
          title="Set the scene."
          description="Pick locations, backdrops, and palettes. Go from studio-clean to editorial drama. Marble slabs, silk backdrops, daylight streaming—complete creative control."
          imageSrc="/images/chapter-scene.jpg"
          imageAlt="Editorial jewelry photography setup with marble and silk"
          imagePosition="left"
        />

        <ProductChapter
          title="Generate. Refine. Perfect."
          description="Create multiple takes, prompt micro-edits, correct reflections, and match skin tones. Retouch tools that understand jewelry photography standards."
          imageSrc="/images/variants-bangles.jpg"
          imageAlt="Three bangle variants in yellow, rose, and white gold"
          imagePosition="right"
        />

        <ProductChapter
          title="Ready for every channel."
          description="One-click exports for PDP, marketplace, and social. Commenting and approvals built-in. Compliant crops, backgrounds, and sizes for every platform."
          imageSrc="/images/chapter-publish.jpg"
          imageAlt="E-commerce mockups showing jewelry product pages"
          imagePosition="left"
        />
      </div>

      <FeatureGrid />
      <BeforeAfter />
      <ShowcaseSection />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div id="pricing">
        <PricingSection />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
