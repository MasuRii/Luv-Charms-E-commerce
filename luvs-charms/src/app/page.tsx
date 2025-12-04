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

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our handpicked selection of beautiful charms
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your perfect charm?
          </h2>
          <p className="mt-4 text-lg text-pink-100">
            Browse our full collection and discover unique pieces made just for you
          </p>
          <a
            href="/shop"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-base font-semibold text-pink-600 shadow-lg transition-all duration-300 hover:bg-pink-50 hover:shadow-xl hover:scale-105"
          >
            View All Products
          </a>
        </div>
      </section>
    </div>
  );
}