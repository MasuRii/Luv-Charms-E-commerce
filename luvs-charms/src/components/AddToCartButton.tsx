"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

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
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 mb-6 ${
        isOutOfStock
          ? 'bg-gray-300 cursor-not-allowed'
          : isAdded
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg active:scale-95'
      }`}
    >
      {isOutOfStock ? 'Out of Stock' : isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
    </button>
  );
}