"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/about" },
    { name: "Merch Builder", href: "/merch-builder" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-black flex items-center justify-center group-hover:bg-alfa-gold transition-colors">
            <span className="text-alfa-gold group-hover:text-black font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Alfa Media Group</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider hover:text-alfa-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="ml-4 btn-primary !py-2 !px-6 text-xs">
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-white z-40 lg:hidden px-6 py-10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold border-b border-gray-100 pb-4"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
