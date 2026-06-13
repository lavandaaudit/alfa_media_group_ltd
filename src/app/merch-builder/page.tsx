"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import { Product, SelectedItem } from "@/types";
import { ShoppingBag, ChevronRight, Download, Send, Trash2, Plus, Minus } from "lucide-react";

const products = productsData as Product[];

const MerchBuilderPage = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [step, setStep] = useState(1);

  const toggleProduct = (productId: string) => {
    setSelectedItems(prev => {
      const exists = prev.find(item => item.productId === productId);
      if (exists) {
        return prev.filter(item => item.productId !== productId);
      } else {
        return [...prev, { productId, quantity: 100 }];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const calculatePrice = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    // Find applicable discount tier
    const applicableTier = [...product.tiers]
      .sort((a, b) => b.min - a.min)
      .find(tier => quantity >= tier.min);
    
    const discount = applicableTier ? applicableTier.discount : 0;
    return product.basePrice * (1 - discount);
  };

  const total = useMemo(() => {
    return selectedItems.reduce((acc, item) => {
      const pricePerUnit = calculatePrice(item.productId, item.quantity);
      return acc + (pricePerUnit * item.quantity);
    }, 0);
  }, [selectedItems]);

  return (
    <div className="section-container min-h-screen pt-32">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Product Selection */}
        <div className="flex-1 space-y-12">
          <div>
            <span className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Configurator</span>
            <h1 className="text-5xl font-bold tracking-tight">Merch Builder</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => {
              const isSelected = selectedItems.some(i => i.productId === product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`group p-6 border-2 transition-all cursor-pointer relative overflow-hidden ${
                    isSelected ? "border-black bg-black text-white" : "border-gray-100 hover:border-alfa-gold"
                  }`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-40 object-cover mb-4 grayscale group-hover:grayscale-0 transition-all opacity-80"
                  />
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className={`text-xs uppercase tracking-widest ${isSelected ? "text-alfa-gold" : "text-gray-400"}`}>
                    Starting at €{product.basePrice.toFixed(2)} / unit
                  </p>
                  
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-alfa-gold rounded-full flex items-center justify-center">
                        <ChevronRight className="text-black" size={14} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Calculation & Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-32 bg-alfa-gray-100 p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
              <ShoppingBag size={20} />
              <h2 className="text-xl font-bold uppercase tracking-widest">Your Summary</h2>
            </div>

            <div className="space-y-6 mb-10 min-h-[200px]">
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-sm py-10 text-center uppercase tracking-widest">Select products to begin</p>
              ) : (
                selectedItems.map((item) => {
                  const product = products.find(p => p.id === item.productId)!;
                  const pricePerUnit = calculatePrice(item.productId, item.quantity);
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.productId} 
                      className="space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-sm tracking-tight">{product.name}</p>
                        <button onClick={() => toggleProduct(product.id)} className="text-gray-400 hover:text-black">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 border border-gray-200">
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, -10); }}><Minus size={12} /></button>
                          <span className="font-bold w-12 text-center">{item.quantity}</span>
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, 10); }}><Plus size={12} /></button>
                        </div>
                        <p className="font-bold text-base">€{(pricePerUnit * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 text-right uppercase tracking-widest">
                        Unit price: €{pricePerUnit.toFixed(2)}
                      </p>
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="border-t-2 border-dashed border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold uppercase text-gray-500">Subtotal</span>
                <span className="text-xl font-bold">€{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Est. Production Time</span>
                <span>7-10 Days</span>
              </div>
              <div className="pt-4 space-y-3">
                <button 
                  disabled={selectedItems.length === 0}
                  className="w-full btn-primary !text-xs disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Quote Request
                </button>
                <button 
                   disabled={selectedItems.length === 0}
                   className="w-full btn-outline border-gray-300 !text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Download size={14} /> Download PDF Estimate
                </button>
              </div>
            </div>
            
            <p className="text-[9px] text-gray-400 mt-6 text-center leading-relaxed">
              *Prices are estimates based on standard production. <br /> Final quotation may vary following artwork review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchBuilderPage;
