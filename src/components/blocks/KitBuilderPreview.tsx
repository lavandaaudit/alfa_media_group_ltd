"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const KitBuilderPreview = () => {
  return (
    <section className="bg-alfa-black text-white overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-alfa-gold font-bold uppercase tracking-[0.3em] text-xs">Innovation</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Build Your Custom <br /> Event Kit</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Use our interactive configurator to select products, calculate costs in real-time, and download a PDF quote in seconds.
            </p>
            
            <ul className="space-y-4 pt-4">
              {["Live Pricing in EUR", "Bespoke Branding Options", "PDF Quotation Generation", "Direct Production Request"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="text-alfa-gold" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <Link href="/merch-builder" className="btn-primary">
                Launch Merch Builder
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Mock Configurator UI */}
            <div className="bg-[#1C1C1E] rounded-3xl p-8 border border-white/10 shadow-3xl relative z-10">
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                  <h4 className="font-bold">Welcome Kit #01</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Configurator v2.4</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Est.</p>
                  <p className="text-2xl font-bold text-alfa-gold">€4,850.00</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: "Premium Hoodie", qty: 250, price: 32.00 },
                  { name: "Custom Notebook", qty: 500, price: 6.50 },
                  { name: "Eco Metal Pen", qty: 1000, price: 1.25 }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.name} 
                    className="flex justify-between items-center bg-white/5 p-4 border-l-2 border-alfa-gold"
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 uppercase">Qty: {item.qty} units</p>
                    </div>
                    <p className="font-bold">€{(item.qty * item.price).toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="h-10 bg-white/5 rounded-none animate-pulse" />
                <div className="h-10 bg-alfa-gold rounded-none" />
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-alfa-gold/10 blur-[100px] rounded-full -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitBuilderPreview;
