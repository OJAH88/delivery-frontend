'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This matches the route in main.py exactly
    fetch('https://delivery-api-jdto.onrender.com/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <main className="grid grid-cols-2 gap-6">
        {products.map((p) => <ProductCard key={p.product_id} product={p} />)}
      </main>
      <CartDrawer />
    </div>
  );
}
