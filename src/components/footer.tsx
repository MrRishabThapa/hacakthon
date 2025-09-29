import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black/80 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3 bg-gradient-sunset bg-clip-text text-transparent">
            Treasure Nepal
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Discover hidden gems, trek majestic mountains, and embrace cultural
            adventures across Nepal.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-white transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-sunset transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sunset transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sunset transition">
              <Twitter size={20} />
            </a>
            <a
              href="mailto:info@adventurenepal.com"
              className="hover:text-sunset transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} AdventureNepal. All rights reserved.
      </div>
    </footer>
  );
}
