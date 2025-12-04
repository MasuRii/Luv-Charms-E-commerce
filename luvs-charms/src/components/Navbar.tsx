'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalQuantity, setShowCart } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700">
              Luv&apos;s Charms
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Shop
            </Link>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label={`Switch to ${theme === 'default' ? 'Sage' : 'Default'} theme`}
              title={`Switch to ${theme === 'default' ? 'Sage' : 'Default'} theme`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Shopping cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
                />
              </svg>
              {/* Cart badge */}
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}