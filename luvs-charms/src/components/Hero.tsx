'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative text-white" style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))' }}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Welcome to{' '}
            <span className="block opacity-90">Luv&apos;s Charms</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Discover unique handcrafted charms and jewelry pieces that add a touch of magic to your everyday style. Each piece is made with love and attention to detail.
          </motion.p>
          <motion.div 
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/shop"
              className="rounded-full px-8 py-3 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
              style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}
            >
              Shop Now
            </Link>
            <Link
              href="#featured"
              className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              style={{ '--hover-color': 'var(--primary)' } as React.CSSProperties}
            >
              View Featured
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12"
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'var(--background)' }}
        >
          <path d="M0 48h1440V0C1440 0 1140 48 720 48S0 0 0 0v48z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}