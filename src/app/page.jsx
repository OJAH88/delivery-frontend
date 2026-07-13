'use client';
import { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function fetchProducts() {
      try {
        // Hardcoded absolute URL to ensure it reaches the backend
        const response = await fetch('https://delivery-api-jdto.onrender.com/api/admin/products');
        
        if (response.ok) {
          const data = await response.json();
          // Ensure we have an array to map over
          setProducts(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch products, status:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-emerald-900/50 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black tracking-widest text-emerald-400">BRANCH</span>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-6 py-10 lg:flex lg:space-x-8">
        <main className="flex-1 lg:max-w-[calc(100%-400px)]">
          {loading ? (
            <div className="text-slate-500 animate-pulse">Querying inventory...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-slate-500">No inventory found. Check backend connection.</div>
          )}
        </main>
        
        <aside className="w-full lg:w-[360px] shrink-0">
          <CartDrawer />
        </aside>
      </div>
    </div>
  );
}
