'use client';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';

export default function BundleBuilder({ title, sizes, availableProducts, baseUnitName }) {
  const addToCart = useCartStore(state => state.addToCart);
  
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSizeSelect = (size) => {
    setActiveSize(size);
    setSelectedItems(prev => prev.slice(0, size.slots));
  };

  const addItemToSlot = (product) => {
    if (selectedItems.length < activeSize.slots) {
      setSelectedItems([...selectedItems, product]);
    }
  };

  const removeItemFromSlot = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (selectedItems.length !== activeSize.slots) return;

    const bundleItem = {
      product_id: `bundle_${title.replace(/\s+/g, '_')}_${activeSize.id}_${Date.now()}`,
      name: `${title} - ${activeSize.label} Mix`,
      base_sticker_price: activeSize.price,
      qty: 1,
      // Array of names so you know exactly what to pack
      strains_included: selectedItems.map(p => p.name) 
    };

    addToCart(bundleItem);
    setSelectedItems([]); // Reset after adding
  };

  return (
    <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl mb-8">
      <h2 className="text-xl font-bold text-emerald-400 mb-4">Build Your {title}</h2>
      
      {/* 1. Size Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sizes.map(size => (
          <button
            key={size.id}
            onClick={() => handleSizeSelect(size)}
            className={`flex-1 min-w-[80px] py-2 rounded text-sm font-bold border transition-colors ${
              activeSize.id === size.id 
                ? 'bg-emerald-600 border-emerald-500 text-white' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            {size.label}<br/>
            <span className="text-xs font-normal">${size.price}</span>
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-slate-300">
        Slots Filled: <span className="font-bold text-white">{selectedItems.length} / {activeSize.slots}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Available Products */}
        <div className="flex-1 space-y-2 max-h-60 overflow-y-auto pr-2">
          {availableProducts.map(product => (
            <button
              key={product.product_id}
              onClick={() => addItemToSlot(product)}
              disabled={selectedItems.length >= activeSize.slots}
              className="w-full text-left p-3 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500 disabled:opacity-50 flex justify-between"
            >
              <span>{product.name}</span>
              <span className="text-emerald-500">+</span>
            </button>
          ))}
        </div>

        {/* Right: The Customer's Bag */}
        <div className="flex-1 space-y-2">
          {Array.from({ length: activeSize.slots }).map((_, i) => {
            const item = selectedItems[i];
            return (
              <div key={i} className="p-3 rounded border border-dashed border-slate-700 bg-slate-900/50 flex justify-between items-center h-12">
                {item ? (
                  <>
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <button onClick={() => removeItemFromSlot(i)} className="text-red-500 text-xs font-bold">X</button>
                  </>
                ) : (
                  <span className="text-sm text-slate-600 italic">Empty {baseUnitName}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={selectedItems.length !== activeSize.slots}
        className="mt-6 w-full py-3 rounded font-black uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white"
      >
        {selectedItems.length === activeSize.slots ? `Add to Bag - $${activeSize.price}` : 'Fill all slots to add'}
      </button>
    </div>
  );
}
