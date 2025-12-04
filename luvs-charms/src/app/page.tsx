'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/sanity/lib/client';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';

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

async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {
    _id,
    name,
    slug,
    price,
    images
  }`;
  
  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then((products) => {
      setFeaturedProducts(products);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <motion.section 
        id="featured" 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--foreground)' }}>
            Featured Products
          </h2>
          <p className="mt-4 text-lg" style={{ color: 'var(--secondary)' }}>
            Discover our handpicked selection of beautiful charms
          </p>
        </div>

        {loading ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg" style={{ color: 'var(--secondary)' }}>Loading products...</p>
          </motion.div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg" style={{ color: 'var(--secondary)' }}>
              No products available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16"
        style={{ backgroundColor: 'var(--primary)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your perfect charm?
          </h2>
          <p className="mt-4 text-lg text-white opacity-90">
            Browse our full collection and discover unique pieces made just for you
          </p>
          <motion.a
            href="/shop"
            className="mt-8 inline-block rounded-full px-8 py-3 text-base font-semibold shadow-lg"
            style={{ backgroundColor: 'var(--background)', color: 'var(--primary)' }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View All Products
          </motion.a>
        </div>
      </motion.section>
    </motion.div>
  );
}