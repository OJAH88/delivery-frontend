'use client';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { items, checkoutData, isLoading, removeFromCart } = useCartStore();

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
      <h2 className="text-white font-bold mb-4">Your Bag</h2>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-white text-sm mb-2">
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.product_id)} className="text-red-400">Remove</button>
        </div>
      ))}
      <div className="border-t border-slate-800 mt-4 pt-4 text-emerald-400 font-bold">
        Total: ${checkoutData?.final_cash_total?.toFixed(2) || '0.00'}
      </div>
    </div>
  );
}
