'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches your real menu items from your Render backend engine
    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    
    // For testing before your database is fully packed, we use placeholder items
    const sampleProducts = [
      { product_id: 1, name: "Premium Flower - 3.5g", base_sticker_price: 45.00, category: "Flower" },
      { product_id: 2, name: "Live Resin Cartridge - 1g", base_sticker_price: 55.00, category: "Vapes" },
      { product_id: 3, name: "100mg THC Gummy Pack", base_sticker_price: 25.00, category: "Edibles" }
    ];

    fetchProducts().then(() => {
      // If your DB returns nothing yet, fall back to sample layout data
      setProducts(prev => prev.length > 0 ? prev : sampleProducts);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Top Banner Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight text-black">FLIPOVA</h1>
          <div className="text-sm font-semibold px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            Delivery Marketplace
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 py-12 pr-[450px]">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Menu</h2>
          <p className="text-gray-500 mt-2">Select items to build your delivery run.</p>
        </div>

        {loading ? (
          <div className="text-gray-400 font-medium animate-pulse">Loading menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer sits firmly on the right side */}
      <CartDrawer />
    </div>
  );
}
