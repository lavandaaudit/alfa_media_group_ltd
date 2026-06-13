"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 bg-alfa-gold text-[10px] font-bold uppercase tracking-[0.2em]">
            European Production Leader
          </div>
          <h1 className="h1">
            Premium Printing & <br />
            <span className="text-alfa-gold">Merchandise</span> Production
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            From high-end offset printing to custom welcome kits. We deliver precision and quality for Europe&apos;s leading brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/services" className="btn-primary text-center">
              Explore Services
            </Link>
            <Link href="/merch-builder" className="btn-outline text-center">
              Build Your Kit
            </Link>
          </div>
          
          <div className="flex items-center gap-8 pt-12 border-t border-gray-100">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Trusted by 500+ <br /> European companies
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Main Visual Placeholder - Representing premium print/packaging */}
          <div className="relative w-full h-full bg-gray-50 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
               <div className="w-full h-full bg-neutral-200 animate-pulse rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-display uppercase tracking-widest text-xs">Premium Product Visual</span>
               </div>
            </div>
          </div>
          
          {/* Floating Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border-l-4 border-alfa-gold max-w-[200px]"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Next-Day Delivery</p>
            <h4 className="text-lg font-bold">Express Production Across EU</h4>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
