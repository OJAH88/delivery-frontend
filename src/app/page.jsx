'use client';
import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false); // Ref to prevent double fetch

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`);
        if (response.ok) {
          const data = await response.json();
          // Filter to ensure unique IDs just in case
          const uniqueProducts = Array.from(new Set(data.map(p => p.product_id)))
            .map(id => data.find(p => p.product_id === id));
          setProducts(uniqueProducts);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
// ... rest of your return code remains the same
