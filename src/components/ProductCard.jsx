'use client';
import { useCartStore } from '@/store/useCartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between hover:border-emerald-900 transition-colors">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-900/20 px-2 py-0.5 rounded">
          {product.category}
        </span>
        <h3 className="text-sm font-bold text-white mt-2">{product.name}</h3>
        <p className="text-slate-400 text-xs mt-1">
          {product.base_sticker_price ? `$${product.base_sticker_price.toFixed(2)}` : 'Volume Pricing'}
        </p>
      </div>
      <button 
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-slate-800 text-white text-xs py-2 rounded font-bold hover:bg-emerald-700 transition-colors"
      >
        Add to Bag
      </button>
    </div>
  );
}
