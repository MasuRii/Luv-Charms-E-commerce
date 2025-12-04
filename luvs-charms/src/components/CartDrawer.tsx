'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { formatOrder } from '@/lib/formatOrder';
import { copyToClipboard } from '@/lib/generateLinks';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cartItems, totalPrice, showCart, setShowCart, toggleCartItemQuantity, onRemove } = useCart();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCheckout = (platform: 'copy') => {
    const message = formatOrder(cartItems, totalPrice);

    if (platform === 'copy') {
      copyToClipboard(message)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error('Copy failed:', err);
          alert('Failed to copy to clipboard');
        });
    }
  };

  return (
    <AnimatePresence>
      {showCart && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowCart(false)}
          />
          
          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[85vw] max-w-md shadow-xl z-50"
            style={{ backgroundColor: 'var(--card-bg)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Shopping Cart</h2>
                <motion.button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close cart"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {cartItems.length === 0 ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-24 h-24 text-gray-300 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <p className="text-lg" style={{ color: 'var(--secondary)' }}>Your cart is empty</p>
                    <p className="text-sm mt-2" style={{ color: 'var(--secondary)', opacity: 0.7 }}>Add some items to get started!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-lg"
                          style={{ backgroundColor: 'var(--background)' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Product Image */}
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden" style={{ backgroundColor: 'var(--card-bg)' }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate" style={{ color: 'var(--foreground)' }}>{item.name}</h3>
                            <p className="font-medium" style={{ color: 'var(--primary)' }}>₱{item.price.toFixed(2)}</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-2">
                              <motion.button
                                onClick={() => toggleCartItemQuantity(item.id, 'dec')}
                                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center border rounded-md transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
                                aria-label="Decrease quantity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                              </motion.button>
                              
                              <span className="font-medium w-8 text-center" style={{ color: 'var(--foreground)' }}>
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                onClick={() => toggleCartItemQuantity(item.id, 'inc')}
                                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center border rounded-md transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
                                aria-label="Increase quantity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => onRemove(item.id)}
                            className="self-start p-2 hover:bg-red-50 rounded-full transition-colors group"
                            aria-label="Remove item"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-400 group-hover:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer with Total */}
              {cartItems.length > 0 && (
                <motion.div
                  className="border-t p-6"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Total:</span>
                    <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                      ₱{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Checkout Buttons */}
                  <div className="space-y-3">
                    {/* Phone Contact Button */}
                    <motion.a
                      href="tel:+639264163675"
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      Call: (+63) 9264163675
                    </motion.a>

                    {/* Coming Soon Notice */}
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                      <p className="text-sm font-medium" style={{ color: 'var(--secondary)' }}>
                        📱 WhatsApp & Messenger ordering
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
                        Coming Soon
                      </p>
                    </div>

                    {/* Copy to Clipboard Button */}
                    <motion.button
                      className={`w-full ${
                        copySuccess ? 'bg-green-600' : 'bg-gray-600'
                      } text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2`}
                      onClick={() => handleCheckout('copy')}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(75, 85, 99, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {copySuccess ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                          </svg>
                          Copy Order Text
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}