'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from '../sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  images: Array<{
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] 
    ? urlFor(product.images[0]).width(400).height(400).url() 
    : '/placeholder.png';

  return (
    <Link 
      href={`/product/${product.slug.current}`}
      className="block"
    >
      <motion.div
        className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-pink-600">
            ₱{product.price.toFixed(2)}
          </p>
          <motion.button 
            className="mt-3 w-full rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            whileHover={{ 
              backgroundColor: "#be185d",
              boxShadow: "0 4px 12px rgba(219, 39, 119, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}