import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  checkoutData: { raw_total: 0, discount_applied: 0, final_cash_total: 0 },
  isLoading: false,

  addToCart: async (product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(i => i.product_id === product.product_id);
    
    let updatedItems = existingItem
      ? currentItems.map(i => i.product_id === product.product_id ? {...i, qty: i.qty + 1} : i)
      : [...currentItems, { ...product, qty: 1 }];

    set({ items: updatedItems, isLoading: true });

    try {
      // Hardcoded URL to bypass environment variable failure
      const response = await fetch('https://delivery-api-jdto.onrender.com/api/cart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
      
      const data = await response.json();
      set({ checkoutData: data, isLoading: false });
    } catch (error) {
      console.error("Math Engine Error:", error);
      set({ isLoading: false });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter(i => i.product_id !== productId) });
  },

  clearCart: () => set({ items: [], checkoutData: { raw_total: 0, discount_applied: 0, final_cash_total: 0 } })
}));
