'use client';
import { useCartStore } from '../store/useCartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  // Safely format price: force to a number, default to 0
  const price = parseFloat(product.base_sticker_price || 0);

  return (
    <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl hover:border-emerald-900 transition-colors">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-bold text-white uppercase tracking-wide">{product.name}</h3>
        {/* Visual indicator if price is 0 so you know it's a data issue */}
        <span className={`text-xs font-bold ${price > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {price > 0 ? `$${price.toFixed(2)}` : 'PRICE MISSING'}
        </span>
      </div>
      
      <button 
        onClick={() => addToCart(product)}
        className="mt-6 w-full bg-slate-800 text-white py-2 rounded font-bold hover:bg-emerald-700 transition-all border border-slate-700"
      >
        Add to Bag
      </button>
    </div>
  );
}
