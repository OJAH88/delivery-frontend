'use client';
import { useCartStore } from '@/store/useCartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded">
            {product.category || 'Item'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mt-2">{product.name}</h3>
        <p className="text-gray-600 mt-1">
          {product.base_sticker_price ? `$${product.base_sticker_price}` : 'Volume Pricing'}
        </p>
      </div>
      <button 
        onClick={() => addToCart(product)}
        className="mt-6 w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
}
