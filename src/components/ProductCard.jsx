'use client';
import { useCartStore } from '../store/useCartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
      <h3 className="text-sm font-bold text-white">{product.name}</h3>
      <button 
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-slate-800 text-white py-2 rounded font-bold hover:bg-emerald-700"
      >
        Add to Bag
      </button>
    </div>
  );
}
