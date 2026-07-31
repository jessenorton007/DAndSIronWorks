import { useState, useCallback } from 'react';
import { EtsyProduct, defaultEtsyProducts } from '@/data/etsy-products';
import { PremiumProduct, defaultPremiumProducts } from '@/data/premium-products';
import { PreMadeItem, preMadeItems as defaultPreMadeItems } from '@/data/premade-items';
import { ServicePage, services as defaultServices } from '@/data/services';

const ETSY_KEY = 'ds_etsy_products_v5';
const PREMIUM_KEY = 'ds_premium_products_v2';
const PREMADE_KEY = 'ds_premade_products_v1';
const SERVICES_KEY = 'ds_services_v2';
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

function readEtsyProducts() {
  const current = readStorage<EtsyProduct[] | null>(ETSY_KEY, null);
  if (current) return current;

  localStorage.setItem(ETSY_KEY, JSON.stringify(defaultEtsyProducts));
  return defaultEtsyProducts;
}

function mergeServices(stored: ServicePage[]) {
  const storedBySlug = new Map(stored.map(service => [service.slug, service]));
  return defaultServices.map(service => ({
    ...service,
    ...(storedBySlug.get(service.slug) ?? {}),
  }));
}

function readServices() {
  const current = readStorage<ServicePage[] | null>(SERVICES_KEY, null);
  const merged = mergeServices(current ?? defaultServices);
  if (!current) localStorage.setItem(SERVICES_KEY, JSON.stringify(merged));
  return merged;
}

export function useEtsyProducts() {
  const [products, setProductsState] = useState<EtsyProduct[]>(() =>
    readEtsyProducts()
  );

  const setProducts = useCallback((updated: EtsyProduct[]) => {
    setProductsState(updated);
    localStorage.setItem(ETSY_KEY, JSON.stringify(updated));
  }, []);

  const addProduct = useCallback((p: EtsyProduct) => {
    setProducts([...readEtsyProducts(), p]);
  }, [setProducts]);

  const updateProduct = useCallback((p: EtsyProduct) => {
    const all = readEtsyProducts();
    setProducts(all.map(x => x.id === p.id ? p : x));
  }, [setProducts]);

  const removeProduct = useCallback((id: string) => {
    const all = readEtsyProducts();
    setProducts(all.filter(x => x.id !== id));
  }, [setProducts]);

  return { products, setProducts, addProduct, updateProduct, removeProduct };
}

export function usePremiumProducts() {
  const [products, setProductsState] = useState<PremiumProduct[]>(() =>
    readStorage<PremiumProduct[]>(PREMIUM_KEY, defaultPremiumProducts)
  );

  const setProducts = useCallback((updated: PremiumProduct[]) => {
    setProductsState(updated);
    localStorage.setItem(PREMIUM_KEY, JSON.stringify(updated));
  }, []);

  const addProduct = useCallback((p: PremiumProduct) => {
    setProducts([...readStorage<PremiumProduct[]>(PREMIUM_KEY, defaultPremiumProducts), p]);
  }, [setProducts]);

  const updateProduct = useCallback((p: PremiumProduct) => {
    const all = readStorage<PremiumProduct[]>(PREMIUM_KEY, defaultPremiumProducts);
    setProducts(all.map(x => x.id === p.id ? p : x));
  }, [setProducts]);

  const removeProduct = useCallback((id: string) => {
    const all = readStorage<PremiumProduct[]>(PREMIUM_KEY, defaultPremiumProducts);
    setProducts(all.filter(x => x.id !== id));
  }, [setProducts]);

  return { products, setProducts, addProduct, updateProduct, removeProduct };
}

export function usePreMadeProducts() {
  const [products, setProductsState] = useState<PreMadeItem[]>(() =>
    readStorage<PreMadeItem[]>(PREMADE_KEY, defaultPreMadeItems)
  );

  const setProducts = useCallback((updated: PreMadeItem[]) => {
    setProductsState(updated);
    localStorage.setItem(PREMADE_KEY, JSON.stringify(updated));
  }, []);

  const addProduct = useCallback((p: PreMadeItem) => {
    setProducts([...readStorage<PreMadeItem[]>(PREMADE_KEY, defaultPreMadeItems), p]);
  }, [setProducts]);

  const updateProduct = useCallback((p: PreMadeItem) => {
    const all = readStorage<PreMadeItem[]>(PREMADE_KEY, defaultPreMadeItems);
    setProducts(all.map(x => x.id === p.id ? p : x));
  }, [setProducts]);

  const removeProduct = useCallback((id: string) => {
    const all = readStorage<PreMadeItem[]>(PREMADE_KEY, defaultPreMadeItems);
    setProducts(all.filter(x => x.id !== id));
  }, [setProducts]);

  return { products, setProducts, addProduct, updateProduct, removeProduct };
}

export function useAdminServices() {
  const [services, setServicesState] = useState<ServicePage[]>(() =>
    readServices()
  );

  const setServices = useCallback((updated: ServicePage[]) => {
    const merged = mergeServices(updated);
    setServicesState(merged);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(merged));
  }, []);

  const updateService = useCallback((service: ServicePage) => {
    const all = readServices();
    setServices(all.map(item => item.slug === service.slug ? service : item));
  }, [setServices]);

  return { services, setServices, updateService };
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
