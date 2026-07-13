'use client';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { items, checkoutData, removeFromCart } = useCartStore();

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 sticky top-8">
      <h2 className="text-xl font-bold mb-4">Your Bag</h2>
      {items.map(item => (
        <div key={item.product_id} className="flex justify-between mb-2">
          <span>{item.name} x {item.qty}</span>
          <button 
            onClick={() => removeFromCart(item.product_id)} 
            className="text-red-500 text-xs ml-4"
          >Remove</button>
        </div>
      ))}
      <div className="mt-4 border-t border-slate-800 pt-4">
        <p>Subtotal: ${checkoutData.raw_total.toFixed(2)}</p>
        <p className="text-emerald-500">Discount: -${checkoutData.discount_applied.toFixed(2)}</p>
        <p className="font-bold text-xl">Total: ${checkoutData.final_cash_total.toFixed(2)}</p>
      </div>
    </div>
  );
}
