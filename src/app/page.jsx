'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://delivery-api-jdto.onrender.com/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="mb-10 text-emerald-400 font-black text-2xl tracking-widest">BRANCH</header>
      
      {/* THIS IS THE LAYOUT FIX: flex-row ensures items are side-by-side */}
      <div className="flex flex-row gap-8 items-start">
        <main className="flex-1 grid grid-cols-2 gap-6">
          {products.map((p) => <ProductCard key={p.product_id} product={p} />)}
        </main>
        
        {/* Force the drawer to stay as a sidebar */}
        <aside className="w-80 shrink-0 sticky top-8">
          <CartDrawer />
        </aside>
      </div>
    </div>
  );
}
