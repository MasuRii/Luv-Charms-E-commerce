import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  description: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  images: Array<{
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }>;
  category: string;
  stockStatus: 'inStock' | 'outOfStock' | 'preOrder';
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    description,
    images,
    "category": category->title,
    stockStatus
  }`;
  
  return await client.fetch(query, { slug });
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(800).height(800).url()
    : '/placeholder.png';

  const isOutOfStock = product.stockStatus === 'outOfStock';

  const getStockBadge = () => {
    switch (product.stockStatus) {
      case 'outOfStock':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            Out of Stock
          </span>
        );
      case 'preOrder':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Pre-Order
          </span>
        );
      case 'inStock':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            In Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to Shop Link */}
        <Link 
          href="/shop"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Category */}
              {product.category && (
                <p className="text-sm text-gray-500 mb-4">
                  Category: <span className="font-medium text-gray-700">{product.category}</span>
                </p>
              )}

              {/* Price */}
              <p className="text-4xl font-bold text-pink-600 mb-4">
                ₱{product.price.toFixed(2)}
              </p>

              {/* Stock Status Badge */}
              <div className="mb-6">
                {getStockBadge()}
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                product={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: imageUrl,
                }}
                isOutOfStock={isOutOfStock}
              />

              {/* Description */}
              {product.description && product.description.length > 0 && (
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <PortableText value={product.description} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}