'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load live database products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      {/* Top Professional Navigation */}
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              MARKETPLACE
            </span>
            <span className="text-xs font-bold uppercase tracking-widest bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700">
              Admin Controls Active
            </span>
          </div>
        </div>
      </header>

      {/* Grid Layout splits content from the persistent side panel */}
      <div className="max-w-7xl mx-auto px-6 py-10 lg:flex lg:space-x-8">
        {/* Main Content Area */}
        <main className="flex-1 lg:max-w-[calc(100%-400px)]">
          <div className="mb-8 border-b border-slate-800 pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">Live Product Catalog</h2>
            <p className="text-slate-400 text-sm mt-1">
              Synchronized directly with your active database ledger tables.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center space-x-2 text-slate-500 font-medium py-10">
              <div className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-transparent animate-spin"></div>
              <span>Querying inventory tables...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-slate-950 border border-dashed border-slate-800 rounded-xl p-12 text-center">
              <p className="text-slate-400 font-medium">No active products found in the database.</p>
              <p className="text-slate-600 text-sm mt-1">
                Ensure rows exist in your Supabase 'products' table where 'is_visible' is true.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          )}
        </main>

        {/* Floating Shopping Cart Sidebar */}
        <aside className="w-full lg:w-[360px] shrink-0 mt-10 lg:mt-0">
          <div className="sticky top-24 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <CartDrawer />
          </div>
        </aside>
      </div>
    </div>
  );
}
