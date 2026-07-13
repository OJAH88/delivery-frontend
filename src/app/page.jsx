'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://delivery-api-jdto.onrender.com/api/admin/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="mb-10 text-emerald-400 font-black text-2xl tracking-widest">BRANCH</header>
      <div className="flex gap-8">
        <main className="flex-1 grid grid-cols-2 gap-6">
          {loading ? <div>Loading...</div> : products.map((p) => (
            <ProductCard key={p.product_id} product={p} />
          ))}
        </main>
        <aside className="w-80"><CartDrawer /></aside>
      </div>
    </div>
  );
}
