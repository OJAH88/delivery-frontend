'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://delivery-api-jdto.onrender.com/api/admin/products');
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="mb-10 text-emerald-400 font-black text-2xl tracking-widest">BRANCH</header>
      {error && <div className="text-red-500 font-bold mb-4">Error loading inventory: {error}</div>}
      <div className="flex gap-8">
        <main className="flex-1 grid grid-cols-2 gap-6">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p.product_id} product={p} />)
          ) : (
            <div className="text-slate-500">No products found or still loading...</div>
          )}
        </main>
        <aside className="w-80"><CartDrawer /></aside>
      </div>
    </div>
  );
}
