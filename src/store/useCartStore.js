import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  checkoutData: { raw_total: 0, discount_applied: 0, final_cash_total: 0 },
  error: null,

  addToCart: async (product) => {
    const currentItems = get().items;
    const existing = currentItems.find(i => i.product_id === product.product_id);
    const updatedItems = existing 
      ? currentItems.map(i => i.product_id === product.product_id ? {...i, qty: i.qty + 1} : i)
      : [...currentItems, { ...product, qty: 1 }];

    // Set items immediately so they don't disappear
    set({ items: updatedItems });

    try {
      const res = await fetch('https://delivery-api-jdto.onrender.com/api/cart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Unknown server error");
      }
      
      set({ checkoutData: data, error: null });
    } catch (e) {
      console.error("DEBUG - Cart Fail:", e.message);
      set({ error: e.message });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter(i => i.product_id !== productId) });
  }
}));
