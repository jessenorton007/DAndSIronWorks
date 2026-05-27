import { useState, useCallback } from 'react';
import { EtsyProduct } from '@/data/etsy-products';
import { PremiumProduct } from '@/data/premium-products';

const ETSY_KEY = 'ds_etsy_products';
const PREMIUM_KEY = 'ds_premium_products';
const ORDERS_KEY = 'ds_orders';
const INQUIRIES_KEY = 'ds_inquiries';

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  submittedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  submittedAt: string;
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useEtsyProducts() {
  const [products, setProductsState] = useState<EtsyProduct[]>(() =>
    readStorage<EtsyProduct[]>(ETSY_KEY, [])
  );

  const setProducts = useCallback((updated: EtsyProduct[]) => {
    setProductsState(updated);
    localStorage.setItem(ETSY_KEY, JSON.stringify(updated));
  }, []);

  const addProduct = useCallback((p: EtsyProduct) => {
    setProducts([...readStorage<EtsyProduct[]>(ETSY_KEY, []), p]);
  }, [setProducts]);

  const updateProduct = useCallback((p: EtsyProduct) => {
    const all = readStorage<EtsyProduct[]>(ETSY_KEY, []);
    setProducts(all.map(x => x.id === p.id ? p : x));
  }, [setProducts]);

  const removeProduct = useCallback((id: string) => {
    const all = readStorage<EtsyProduct[]>(ETSY_KEY, []);
    setProducts(all.filter(x => x.id !== id));
  }, [setProducts]);

  return { products, setProducts, addProduct, updateProduct, removeProduct };
}

export function usePremiumProducts() {
  const [products, setProductsState] = useState<PremiumProduct[]>(() =>
    readStorage<PremiumProduct[]>(PREMIUM_KEY, [])
  );

  const setProducts = useCallback((updated: PremiumProduct[]) => {
    setProductsState(updated);
    localStorage.setItem(PREMIUM_KEY, JSON.stringify(updated));
  }, []);

  const addProduct = useCallback((p: PremiumProduct) => {
    setProducts([...readStorage<PremiumProduct[]>(PREMIUM_KEY, []), p]);
  }, [setProducts]);

  const updateProduct = useCallback((p: PremiumProduct) => {
    const all = readStorage<PremiumProduct[]>(PREMIUM_KEY, []);
    setProducts(all.map(x => x.id === p.id ? p : x));
  }, [setProducts]);

  const removeProduct = useCallback((id: string) => {
    const all = readStorage<PremiumProduct[]>(PREMIUM_KEY, []);
    setProducts(all.filter(x => x.id !== id));
  }, [setProducts]);

  return { products, setProducts, addProduct, updateProduct, removeProduct };
}

export function saveOrder(order: Omit<Order, 'id' | 'submittedAt'>) {
  const all = readStorage<Order[]>(ORDERS_KEY, []);
  const full: Order = {
    ...order,
    id: `ord_${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([full, ...all]));
}

export function getOrders(): Order[] {
  return readStorage<Order[]>(ORDERS_KEY, []);
}

export function saveInquiry(inq: Omit<Inquiry, 'id' | 'submittedAt'>) {
  const all = readStorage<Inquiry[]>(INQUIRIES_KEY, []);
  const full: Inquiry = {
    ...inq,
    id: `inq_${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify([full, ...all]));
}

export function getInquiries(): Inquiry[] {
  return readStorage<Inquiry[]>(INQUIRIES_KEY, []);
}

export function deleteOrder(id: string) {
  const all = readStorage<Order[]>(ORDERS_KEY, []);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(all.filter(o => o.id !== id)));
}

export function deleteInquiry(id: string) {
  const all = readStorage<Inquiry[]>(INQUIRIES_KEY, []);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all.filter(i => i.id !== id)));
}
