import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';

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
  isFeatured?: boolean;
  isPopular?: boolean;
}

async function getProducts(): Promise<Product[]> {
  // Order by isPopular first, then isFeatured, then by creation date
  const query = `*[_type == "product"] | order(isPopular desc, isFeatured desc, _createdAt desc) {
    _id,
    name,
    slug,
    price,
    images,
    isFeatured,
    isPopular
  }`;
  
  return await client.fetch(
    query,
    {},
    { cache: 'no-store' } // Always fetch fresh data, no caching
  );
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          Shop All
        </h1>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl" style={{ color: 'var(--secondary)' }}>No products found.</p>
            <p className="text-sm mt-2" style={{ color: 'var(--secondary)', opacity: 0.7 }}>Check back soon for new items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}