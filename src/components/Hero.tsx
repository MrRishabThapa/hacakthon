import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Nepal Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your Adventure,
          <span className="block bg-gradient-sunset bg-clip-text text-transparent">
            Your Game
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Embark on extraordinary adventures through ancient temples, majestic
          mountains, and hidden gems waiting to be discovered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/signup">
            <Button variant="hero" size="xl" className="group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link to="/about">
            <Button
              variant="outline"
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-white/80">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-sm text-white/80">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.9★</div>
            <div className="text-sm text-white/80">Rating</div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-hero rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-sunset rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-adventure rounded-full opacity-25 animate-pulse delay-500"></div>
    </div>
  );
}
