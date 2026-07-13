import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  checkoutData: { raw_total: 0, discount_applied: 0, final_cash_total: 0 },

  addToCart: async (product) => {
    const currentItems = get().items;
    const existing = currentItems.find(i => i.product_id === product.product_id);
    const updatedItems = existing 
      ? currentItems.map(i => i.product_id === product.product_id ? {...i, qty: i.qty + 1} : i)
      : [...currentItems, { ...product, qty: 1 }];

    set({ items: updatedItems });

    try {
      const res = await fetch('https://delivery-api-jdto.onrender.com/api/cart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
      const data = await res.json();
      set({ checkoutData: data });
    } catch (e) {
      console.error("Cart Error:", e);
    }
  }
}));
