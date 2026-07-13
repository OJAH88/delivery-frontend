import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  checkoutData: { raw_total: 0, final_cash_total: 0 },
  
  addToCart: async (product) => {
    const items = [...get().items];
    const existing = items.find(i => i.product_id === product.product_id);
    const updatedItems = existing 
      ? items.map(i => i.product_id === product.product_id ? {...i, qty: i.qty + 1} : i)
      : [...items, { ...product, qty: 1 }];

    set({ items: updatedItems });

    try {
      // Hardcoded absolute path
      const res = await fetch('https://delivery-api-jdto.onrender.com/api/cart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
      set({ checkoutData: await res.json() });
    } catch (e) {
      console.error("Cart Math Error:", e);
    }
  },
  removeFromCart: (pid) => set({ items: get().items.filter(i => i.product_id !== pid) })
}));
