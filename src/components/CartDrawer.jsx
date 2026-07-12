'use client';
import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  const { items, checkoutData, isLoading, removeFromCart } = useCartStore();

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
      <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
        <h2 className="text-lg font-bold text-white">Your Delivery</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {items.length === 0 ? (
          <p className="text-slate-500 text-center text-sm">Your bag is empty.</p>
        ) : (
          items.map((item, index) => (
            // Use index as key to prevent hydration mismatches if IDs duplicate
            <div key={`${item.product_id}-${index}`} className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <p className="text-sm font-bold text-white">{item.name}</p>
                <p className="text-xs text-emerald-500">Qty: {item.qty} @ ${item.base_sticker_price?.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.product_id)}
                className="text-red-400 text-xs hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-5 bg-slate-900 border-t border-slate-800">
          {isLoading ? (
            <p className="text-center text-emerald-500 text-sm animate-pulse">Calculating...</p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white">${checkoutData.raw_total?.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <p className="text-white font-bold">Total</p>
                <span className="text-xl font-black text-emerald-400">
                  ${checkoutData.final_cash_total?.toFixed(2)}
                </span>
              </div>
              <button className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-500 transition-colors">
                Checkout & Schedule
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
