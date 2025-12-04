import { client } from '@/sanity/lib/client';
import HomePageContent from '@/components/HomePageContent';

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

interface SiteSettings {
  featuredProductsLimit: number;
}

async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    featuredProductsLimit
  }`;
  
  try {
    const settings = await client.fetch(query, {}, { cache: 'no-store' });
    return settings || { featuredProductsLimit: 5 }; // Default to 5 if not set
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return { featuredProductsLimit: 5 };
  }
}

async function getFeaturedProducts(limit: number): Promise<Product[]> {
  // Query featured products, ordering by isPopular first, then by creation date
  // Include both popular and featured products
  const query = `*[_type == "product" && (isFeatured == true || isPopular == true)] | order(isPopular desc, _createdAt desc) [0...$limit] {
    _id,
    name,
    slug,
    price,
    images,
    isFeatured,
    isPopular
  }`;
  
  try {
    const products = await client.fetch(
      query,
      { limit },
      { cache: 'no-store' } // Always fetch fresh data, no caching
    );
    
    // If no featured products found, fall back to latest products
    if (products.length === 0) {
      const fallbackQuery = `*[_type == "product"] | order(_createdAt desc) [0...$limit] {
        _id,
        name,
        slug,
        price,
        images,
        isFeatured,
        isPopular
      }`;
      return await client.fetch(fallbackQuery, { limit }, { cache: 'no-store' });
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const siteSettings = await getSiteSettings();
  const limit = siteSettings.featuredProductsLimit || 5;
  const featuredProducts = await getFeaturedProducts(limit);

  return <HomePageContent featuredProducts={featuredProducts} />;
}