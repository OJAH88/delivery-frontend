'use client';
import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  const { items, checkoutData, isLoading, removeFromCart } = useCartStore();
  const isOpen = true; 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col pointer-events-auto">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold">Your Bag</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your bag is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.product_id} className="flex justify-between items-center border-b pb-4 border-gray-50">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.product_id)}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          {isLoading ? (
            <p className="text-center text-gray-500 animate-pulse">Calculating deals...</p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${checkoutData.raw_total?.toFixed(2)}</span>
              </div>
              {checkoutData.discount_applied > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Deals Applied</span>
                  <span>-${checkoutData.discount_applied?.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rounded Total</p>
                  <p className="text-2xl font-black text-black">Total</p>
                </div>
                <span className="text-3xl font-black text-black">
                  ${checkoutData.final_cash_total}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
