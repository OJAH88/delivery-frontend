'use client';
import { useEffect, useState } from 'react';
import BundleBuilder from '../components/BundleBuilder';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

// --- BUNDLE CONFIGURATIONS ---
const CONFIGS = {
  tier1: [
    { id: 't1_8', label: '1/8 oz', slots: 1, price: 45.0 },
    { id: 't1_4', label: '1/4 oz', slots: 2, price: 80.0 },
    { id: 't1_2', label: '1/2 oz', slots: 4, price: 150.0 },
    { id: 't1_1', label: '1 oz', slots: 8, price: 280.0 }
  ],
  tier2: [
    { id: 't2_8', label: '1/8 oz', slots: 1, price: 35.0 },
    { id: 't2_4', label: '1/4 oz', slots: 2, price: 60.0 },
    { id: 't2_2', label: '1/2 oz', slots: 4, price: 110.0 },
    { id: 't2_1', label: '1 oz', slots: 8, price: 200.0 }
  ],
  tier3: [
    { id: 't3_8', label: '1/8 oz', slots: 1, price: 25.0 },
    { id: 't3_4', label: '1/4 oz', slots: 2, price: 45.0 },
    { id: 't3_2', label: '1/2 oz', slots: 4, price: 80.0 },
    { id: 't3_1', label: '1 oz', slots: 8, price: 150.0 }
  ],
  bho: [
    { id: 'bho_1', label: '1g', slots: 1, price: 30.0 },
    { id: 'bho_35', label: '3.5g Bucket', slots: 1, price: 90.0 }, 
    { id: 'bho_7', label: '7g', slots: 7, price: 170.0 }, 
    { id: 'bho_14', label: '14g', slots: 14, price: 300.0 },
    { id: 'bho_28', label: '28g', slots: 28, price: 550.0 }
  ]
};

const TABS = [
  { id: 'flower', label: 'Flower' },
  { id: 'concentrates', label: 'Concentrates' },
  { id: 'vapes', label: 'Vapes & Carts' },
  { id: 'edibles', label: 'Edibles' }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('flower');

  useEffect(() => {
    fetch('https://delivery-api-jdto.onrender.com/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  // --- FILTER LOGIC --- 
  // Update the category_id numbers below to match what is in your Supabase!
  const tier1Strains = products.filter(p => p.tier_name === 'Tier 1');
  const tier2Strains = products.filter(p => p.tier_name === 'Tier 2');
  const tier3Strains = products.filter(p => p.tier_name === 'Tier 3');
  const bhoProducts = products.filter(p => p.category_id === 2); 
  const vapeProducts = products.filter(p => p.category_id === 3 || p.tier_name === 'Vapes'); 
  const edibleProducts = products.filter(p => p.category_id === 4 || p.tier_name === 'Edibles');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="mb-8 flex justify-between items-baseline border-b border-slate-800 pb-4">
        <h1 className="text-emerald-400 font-black text-3xl tracking-widest">BRANCH</h1>
        
        {/* Navigation Tabs */}
        <nav className="flex space-x-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-bold transition-colors ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-950 text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      
      <div className="flex flex-row gap-8 items-start">
        <main className="flex-1 space-y-8">
          
          {/* FLOWER TAB */}
          {activeTab === 'flower' && (
            <>
              {tier1Strains.length > 0 && <BundleBuilder title="Tier 1 Flower" sizes={CONFIGS.tier1} availableProducts={tier1Strains} baseUnitName="1/8th" />}
              {tier2Strains.length > 0 && <BundleBuilder title="Tier 2 Flower" sizes={CONFIGS.tier2} availableProducts={tier2Strains} baseUnitName="1/8th" />}
              {tier3Strains.length > 0 && <BundleBuilder title="Tier 3 Flower" sizes={CONFIGS.tier3} availableProducts={tier3Strains} baseUnitName="1/8th" />}
              {tier1Strains.length === 0 && tier2Strains.length === 0 && <div className="text-slate-500">No flower available.</div>}
            </>
          )}

          {/* CONCENTRATES TAB */}
          {activeTab === 'concentrates' && (
            <>
              {bhoProducts.length > 0 ? (
                <BundleBuilder title="BHO Concentrates" sizes={CONFIGS.bho} availableProducts={bhoProducts} baseUnitName="1g Jar" />
              ) : (
                <div className="text-slate-500">No concentrates available.</div>
              )}
            </>
          )}

          {/* VAPES TAB */}
          {activeTab === 'vapes' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {vapeProducts.length > 0 ? (
                vapeProducts.map(p => <ProductCard key={p.product_id} product={p} />)
              ) : (
                <div className="text-slate-500 col-span-full">No vapes or carts available.</div>
              )}
            </div>
          )}

          {/* EDIBLES TAB */}
          {activeTab === 'edibles' && (
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
               {edibleProducts.length > 0 ? (
                 edibleProducts.map(p => <ProductCard key={p.product_id} product={p} />)
               ) : (
                 <div className="text-slate-500 col-span-full">No edibles available.</div>
               )}
             </div>
          )}

        </main>
        
        {/* Cart Drawer is always visible on the right */}
        <aside className="w-80 shrink-0 sticky top-8">
          <CartDrawer />
        </aside>
      </div>
    </div>
  );
}
