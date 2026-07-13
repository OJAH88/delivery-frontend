import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  checkoutData: { raw_total: 0, discount_applied: 0, final_cash_total: 0 },

  // Logic for both Adding and Removing
  updateCart: async (updatedItems) => {
    set({ items: updatedItems });
    try {
      const res = await fetch('https://delivery-api-jdto.onrender.com/api/cart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
      const data = await res.json();
      set({ checkoutData: data });
    } catch (e) { console.error(e); }
  },

  addToCart: (product) => {
    const current = get().items;
    const existing = current.find(i => i.product_id === product.product_id);
    const updated = existing 
      ? current.map(i => i.product_id === product.product_id ? {...i, qty: i.qty + 1} : i)
      : [...current, { ...product, qty: 1 }];
    get().updateCart(updated);
  },

  removeFromCart: (productId) => {
    const updated = get().items.filter(i => i.product_id !== productId);
    get().updateCart(updated);
  }
}));
