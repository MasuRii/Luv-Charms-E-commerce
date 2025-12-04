"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  isOutOfStock: boolean;
}

export default function AddToCartButton({ product, isOutOfStock }: AddToCartButtonProps) {
  const { onAdd } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAdd(product, 1);
      setIsAdded(true);
      
      // Reset feedback after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 mb-6 ${
        isOutOfStock
          ? 'cursor-not-allowed'
          : 'hover:shadow-lg'
      }`}
      style={{
        backgroundColor: isOutOfStock
          ? 'var(--border)'
          : isAdded
          ? '#16a34a'
          : 'var(--primary)'
      }}
      whileHover={!isOutOfStock ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
      whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
      animate={isAdded ? {
        scale: [1, 1.1, 1],
      } : {}}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={isAdded ? {
          opacity: [1, 0, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        {isOutOfStock ? 'Out of Stock' : isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
      </motion.span>
    </motion.button>
  );
}