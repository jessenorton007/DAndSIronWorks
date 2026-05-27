import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import {
  LayoutDashboard, ShoppingBag, Gem, MessageSquare,
  ClipboardList, Settings, LogOut, Plus, Pencil,
  Trash2, X, Upload, ExternalLink, ChevronDown, ChevronUp, Check
} from 'lucide-react';
import {
  useEtsyProducts, usePremiumProducts,
  getOrders, getInquiries, deleteOrder, deleteInquiry,
  Order, Inquiry
} from '@/hooks/useAdminProducts';
import { EtsyProduct } from '@/data/etsy-products';
import { PremiumProduct } from '@/data/premium-products';

const SESSION_KEY = 'ds_admin_auth';

type Tab = 'overview' | 'etsy' | 'premium' | 'inquiries' | 'orders' | 'settings';

const SETTINGS_KEY = 'ds_site_settings';
interface SiteSettings { phone: string; email: string; facebook: string; }
const defaultSettings: SiteSettings = { phone: '(435) 421-9033', email: 'dandsiron@yahoo.com', facebook: '@DallanGoffBlacksmith' };
function getSettings(): SiteSettings {
  try { const s = localStorage.getItem(SETTINGS_KEY); return s ? JSON.parse(s) : defaultSettings; } catch { return defaultSettings; }
}

function inputCls(extra = '') {
  return `w-full rounded-lg px-3 py-2.5 text-white text-sm font-sans placeholder:text-white/20 focus:outline-none transition-colors ${extra}`;
}
const iStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' };
function iFocus(e: React.FocusEvent<any>) { e.currentTarget.style.borderColor = 'rgba(255,140,26,0.5)'; }
function iBlur(e: React.FocusEvent<any>) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }

// ── Image upload helper ──────────────────────────────────────────
function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'url' | 'file'>(value.startsWith('data:') ? 'file' : 'url');
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('url')}
          className={`text-xs font-display tracking-widest uppercase px-3 py-1 rounded-full transition-colors ${mode === 'url' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-white/30 hover:text-white/60'}`}>
          URL
        </button>
        <button type="button" onClick={() => setMode('file')}
          className={`text-xs font-display tracking-widest uppercase px-3 py-1 rounded-full transition-colors ${mode === 'file' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-white/30 hover:text-white/60'}`}>
          Upload
        </button>
      </div>
      {mode === 'url' ? (
        <input type="text" value={value.startsWith('data:') ? '' : value} onChange={e => onChange(e.target.value)}
          placeholder="https://... or /images/filename.jpg"
          className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
      ) : (
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white transition-colors w-full"
            style={iStyle}>
            <Upload size={14} />
            {value.startsWith('data:') ? 'Image uploaded — click to replace' : 'Choose image file'}
          </button>
          {value.startsWith('data:') && (
            <img src={value} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-lg border border-white/10" />
          )}
        </div>
      )}
    </div>
  );
}

// ── Etsy product form ────────────────────────────────────────────
const emptyEtsy = (): EtsyProduct => ({ id: '', title: '', image: '', priceLabel: '', etsyUrl: 'https://www.etsy.com/shop/dandsironworks', description: '', details: [] });

function EtsyForm({ initial, onSave, onClose }: { initial: EtsyProduct | null; onSave: (p: EtsyProduct) => void; onClose: () => void }) {
  const [f, setF] = useState<EtsyProduct>(initial ?? emptyEtsy());
  const [detailsText, setDetailsText] = useState((initial?.details ?? []).join('\n'));
  const set = (k: keyof EtsyProduct, v: any) => setF(p => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = detailsText.split('\n').map(s => s.trim()).filter(Boolean);
    const id = f.id || `ep_${Date.now()}`;
    onSave({ ...f, id, details });
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-sm">Title *</label>
          <input required value={f.title} onChange={e => set('title', e.target.value)} placeholder="Hand-Forged Hook" className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
        </div>
        <div>
          <label className="label-sm">Price *</label>
          <input required value={f.priceLabel} onChange={e => set('priceLabel', e.target.value)} placeholder="$45.00" className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
        </div>
      </div>
      <div>
        <label className="label-sm">Product Image</label>
        <ImageField value={f.image} onChange={v => set('image', v)} />
      </div>
      <div>
        <label className="label-sm">Etsy Product URL</label>
        <input value={f.etsyUrl} onChange={e => set('etsyUrl', e.target.value)} placeholder="https://www.etsy.com/listing/..." className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
      </div>
      <div>
        <label className="label-sm">Description *</label>
        <textarea required rows={3} value={f.description} onChange={e => set('description', e.target.value)} placeholder="Describe the product..." className={inputCls('resize-none')} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
      </div>
      <div>
        <label className="label-sm">Specs / Details <span className="text-white/25 normal-case font-sans tracking-normal">(one per line)</span></label>
        <textarea rows={3} value={detailsText} onChange={e => setDetailsText(e.target.value)} placeholder={"Solid iron bar stock\nHand-hammered finish\nBeeswax rust protection"} className={inputCls('resize-none')} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 py-2.5 rounded-lg font-display uppercase tracking-widest text-sm text-white" style={{ background: 'linear-gradient(135deg,#FF4D00,#FF8C1A)', boxShadow: '0 4px 16px rgba(255,77,0,0.25)' }}>
          {initial ? 'Save Changes' : 'Add Product'}
        </button>
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-white/40 hover:text-white transition-colors text-sm" style={iStyle}>Cancel</button>
      </div>
    </form>
  );
}

// ── Premium product form ─────────────────────────────────────────
const emptyPremium = (): PremiumProduct => ({ id: '', title: '', image: '', priceLabel: '', description: '' });

function PremiumForm({ initial, onSave, onClose }: { initial: PremiumProduct | null; onSave: (p: PremiumProduct) => void; onClose: () => void }) {
  const [f, setF] = useState<PremiumProduct>(initial ?? emptyPremium());
  const set = (k: keyof PremiumProduct, v: any) => setF(p => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = f.id || `pr_${Date.now()}`;
    onSave({ ...f, id });
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-sm">Title *</label>
          <input required value={f.title} onChange={e => set('title', e.target.value)} placeholder="Custom Fire Pit" className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
        </div>
        <div>
          <label className="label-sm">Price *</label>
          <input required value={f.priceLabel} onChange={e => set('priceLabel', e.target.value)} placeholder="$1,200.00" className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
        </div>
      </div>
      <div>
        <label className="label-sm">Product Image</label>
        <ImageField value={f.image} onChange={v => set('image', v)} />
      </div>
      <div>
        <label className="label-sm">Description *</label>
        <textarea required rows={4} value={f.description} onChange={e => set('description', e.target.value)} placeholder="Describe this signature piece..." className={inputCls('resize-none')} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 py-2.5 rounded-lg font-display uppercase tracking-widest text-sm text-white" style={{ background: 'linear-gradient(135deg,#FF4D00,#FF8C1A)', boxShadow: '0 4px 16px rgba(255,77,0,0.25)' }}>
          {initial ? 'Save Changes' : 'Add Product'}
        </button>
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-white/40 hover:text-white transition-colors text-sm" style={iStyle}>Cancel</button>
      </div>
    </form>
  );
}

// ── Modal wrapper ────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="rounded-2xl p-7 relative" style={{ background: 'rgba(14,10,6,0.98)', border: '1px solid rgba(255,140,26,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg uppercase tracking-widest text-white">{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-full text-white/30 hover:text-white/70 transition-colors"><X size={16} /></button>
          </div>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Confirm delete dialog ────────────────────────────────────────
function Confirm({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onCancel} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-sm mx-4">
        <div className="rounded-2xl p-7" style={{ background: 'rgba(14,10,6,0.98)', border: '1px solid rgba(255,80,80,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}>
          <p className="text-white/75 font-sans text-sm mb-6">{msg}</p>
          <div className="flex gap-3">
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg font-display uppercase tracking-widest text-sm text-white" style={{ background: 'rgba(255,60,60,0.7)', border: '1px solid rgba(255,60,60,0.3)' }}>Delete</button>
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg font-display uppercase tracking-widest text-sm text-white/50 hover:text-white transition-colors" style={iStyle}>Cancel</button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Section header ───────────────────────────────────────────────
function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-7 gap-4">
      <div>
        <h2 className="font-display text-2xl uppercase tracking-widest text-white">{title}</h2>
        {sub && <p className="text-white/35 text-xs font-sans mt-1">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,140,26,0.1)', border: '1px solid rgba(255,140,26,0.2)' }}>
        <Icon size={16} className="text-orange-400" />
      </div>
      <div>
        <p className="text-2xl font-display text-white">{value}</p>
        <p className="text-xs font-display tracking-widest uppercase text-white/35">{label}</p>
      </div>
    </div>
  );
}

// ── Main admin panel ─────────────────────────────────────────────
export function AdminPanel() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { products: etsyProducts, addProduct: addEtsy, updateProduct: updateEtsy, removeProduct: removeEtsy } = useEtsyProducts();
  const { products: premiumProducts, addProduct: addPremium, updateProduct: updatePremium, removeProduct: removePremium } = usePremiumProducts();
  const [orders, setOrders] = useState<Order[]>(() => getOrders());
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => getInquiries());

  const [etsyModal, setEtsyModal] = useState<{ open: boolean; editing: EtsyProduct | null }>({ open: false, editing: null });
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; editing: PremiumProduct | null }>({ open: false, editing: null });
  const [confirm, setConfirm] = useState<{ msg: string; onConfirm: () => void } | null>(null);

  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) !== '1') navigate('/');
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate('/');
  };

  const handleDeleteOrder = (id: string) => {
    setConfirm({ msg: 'Delete this order permanently?', onConfirm: () => { deleteOrder(id); setOrders(getOrders()); setConfirm(null); } });
  };
  const handleDeleteInquiry = (id: string) => {
    setConfirm({ msg: 'Delete this inquiry permanently?', onConfirm: () => { deleteInquiry(id); setInquiries(getInquiries()); setConfirm(null); } });
  };

  const saveSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const navItems: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'etsy', label: 'Shop Products', icon: ShoppingBag, badge: etsyProducts.length },
    { id: 'premium', label: 'Signature Pieces', icon: Gem, badge: premiumProducts.length },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, badge: inquiries.length },
    { id: 'orders', label: 'Orders', icon: ClipboardList, badge: orders.length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'var(--app-font-sans)' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-3.5"
        style={{ background: 'rgba(10,7,4,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-3">
          <button className="md:hidden p-1 text-white/50 hover:text-white" onClick={() => setMobileNavOpen(v => !v)}>
            {mobileNavOpen ? <X size={20} /> : <ChevronDown size={20} />}
          </button>
          <img src="/brand/logo.png" alt="Admin" className="h-8 w-auto" style={{ filter: 'invert(1) brightness(0.7)' }} />
          <span className="font-display text-sm uppercase tracking-widest text-white/40">Admin</span>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-xs font-display tracking-widest uppercase text-white/30 hover:text-red-400 transition-colors px-3 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <LogOut size={12} />
          Logout
        </button>
      </div>

      <div className="flex pt-14">
        {/* Sidebar */}
        <AnimatePresence>
          {(true) && (
            <aside className={`${mobileNavOpen ? 'block' : 'hidden'} md:block fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-56 flex-shrink-0 overflow-y-auto z-20`}
              style={{ background: 'rgba(10,7,4,0.97)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <nav className="p-4 flex flex-col gap-1">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => { setTab(item.id); setMobileNavOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-sm font-sans transition-all duration-150 group"
                    style={{
                      background: tab === item.id ? 'rgba(255,140,26,0.12)' : 'transparent',
                      color: tab === item.id ? '#ff8c1a' : 'rgba(255,255,255,0.45)',
                      border: tab === item.id ? '1px solid rgba(255,140,26,0.2)' : '1px solid transparent',
                    }}>
                    <item.icon size={15} className={tab === item.id ? 'text-orange-400' : 'text-white/30 group-hover:text-white/50'} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: tab === item.id ? 'rgba(255,140,26,0.2)' : 'rgba(255,255,255,0.08)', color: tab === item.id ? '#ff8c1a' : 'rgba(255,255,255,0.4)' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6 md:p-10">
          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div>
              <SectionHeader title="Overview" sub="D & S Iron Works admin dashboard" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Shop Products" value={etsyProducts.length} icon={ShoppingBag} />
                <StatCard label="Signature Pieces" value={premiumProducts.length} icon={Gem} />
                <StatCard label="Inquiries" value={inquiries.length} icon={MessageSquare} />
                <StatCard label="Orders" value={orders.length} icon={ClipboardList} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="font-display uppercase tracking-widest text-sm text-white/50 mb-4">Recent Inquiries</h3>
                  {inquiries.length === 0 ? <p className="text-white/25 text-sm">No inquiries yet.</p> : inquiries.slice(0, 3).map(i => (
                    <div key={i.id} className="py-3 border-b border-white/5 last:border-0">
                      <p className="text-white/80 text-sm font-medium">{i.name}</p>
                      <p className="text-white/35 text-xs mt-0.5">{i.projectType || 'No type'} · {new Date(i.submittedAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="font-display uppercase tracking-widest text-sm text-white/50 mb-4">Recent Orders</h3>
                  {orders.length === 0 ? <p className="text-white/25 text-sm">No orders yet.</p> : orders.slice(0, 3).map(o => (
                    <div key={o.id} className="py-3 border-b border-white/5 last:border-0">
                      <p className="text-white/80 text-sm font-medium">{o.name}</p>
                      <p className="text-white/35 text-xs mt-0.5">{o.productTitle} · {o.productPrice}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ETSY PRODUCTS */}
          {tab === 'etsy' && (
            <div>
              <SectionHeader title="Shop Products" sub="Forge shop products linked to Etsy"
                action={
                  <button onClick={() => setEtsyModal({ open: true, editing: null })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-display uppercase tracking-widest text-sm text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#FF4D00,#FF8C1A)', boxShadow: '0 4px 14px rgba(255,77,0,0.25)' }}>
                    <Plus size={14} /> Add Product
                  </button>
                }
              />
              {etsyProducts.length === 0 ? (
                <div className="rounded-xl flex flex-col items-center justify-center py-24 gap-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <ShoppingBag size={32} className="text-white/15" />
                  <p className="text-white/25 text-sm font-sans">No products yet — add your first one</p>
                  <button onClick={() => setEtsyModal({ open: true, editing: null })} className="text-xs font-display tracking-widest uppercase text-orange-400/70 hover:text-orange-400 transition-colors">+ Add Product</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {etsyProducts.map(p => (
                    <div key={p.id} className="rounded-xl overflow-hidden flex flex-col" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="aspect-square overflow-hidden bg-white/5">
                        {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={32} className="text-white/15" /></div>}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <p className="font-display uppercase tracking-wider text-white text-sm mb-1">{p.title}</p>
                        <p className="text-orange-400/80 text-sm mb-3 font-sans">{p.priceLabel}</p>
                        <p className="text-white/35 text-xs font-sans flex-1 line-clamp-2">{p.description}</p>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => setEtsyModal({ open: true, editing: p })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-colors flex-1 justify-center" style={iStyle}>
                            <Pencil size={12} /> Edit
                          </button>
                          <a href={p.etsyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-orange-400 transition-colors" style={iStyle}>
                            <ExternalLink size={12} />
                          </a>
                          <button onClick={() => setConfirm({ msg: `Delete "${p.title}"?`, onConfirm: () => { removeEtsy(p.id); setConfirm(null); } })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/30 hover:text-red-400 transition-colors" style={iStyle}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PREMIUM PRODUCTS */}
          {tab === 'premium' && (
            <div>
              <SectionHeader title="Signature Pieces" sub="High-end pieces with on-site ordering"
                action={
                  <button onClick={() => setPremiumModal({ open: true, editing: null })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-display uppercase tracking-widest text-sm text-white"
                    style={{ background: 'linear-gradient(135deg,#FF4D00,#FF8C1A)', boxShadow: '0 4px 14px rgba(255,77,0,0.25)' }}>
                    <Plus size={14} /> Add Piece
                  </button>
                }
              />
              {premiumProducts.length === 0 ? (
                <div className="rounded-xl flex flex-col items-center justify-center py-24 gap-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <Gem size={32} className="text-white/15" />
                  <p className="text-white/25 text-sm font-sans">No signature pieces yet</p>
                  <button onClick={() => setPremiumModal({ open: true, editing: null })} className="text-xs font-display tracking-widest uppercase text-orange-400/70 hover:text-orange-400 transition-colors">+ Add Piece</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {premiumProducts.map(p => (
                    <div key={p.id} className="rounded-xl overflow-hidden flex flex-col" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="aspect-[4/3] overflow-hidden bg-white/5">
                        {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Gem size={32} className="text-white/15" /></div>}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <p className="font-display uppercase tracking-wider text-white text-sm mb-1">{p.title}</p>
                        <p className="text-orange-400/80 text-sm mb-3 font-sans">{p.priceLabel}</p>
                        <p className="text-white/35 text-xs font-sans flex-1 line-clamp-2">{p.description}</p>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => setPremiumModal({ open: true, editing: p })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-colors flex-1 justify-center" style={iStyle}>
                            <Pencil size={12} /> Edit
                          </button>
                          <button onClick={() => setConfirm({ msg: `Delete "${p.title}"?`, onConfirm: () => { removePremium(p.id); setConfirm(null); } })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/30 hover:text-red-400 transition-colors" style={iStyle}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INQUIRIES */}
          {tab === 'inquiries' && (
            <div>
              <SectionHeader title="Inquiries" sub="Messages from the contact page" />
              {inquiries.length === 0 ? (
                <div className="rounded-xl flex flex-col items-center justify-center py-24 gap-3" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <MessageSquare size={32} className="text-white/15" />
                  <p className="text-white/25 text-sm font-sans">No inquiries yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {inquiries.map(i => (
                    <div key={i.id} className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <p className="font-display uppercase tracking-wider text-white text-sm">{i.name}</p>
                            {i.projectType && <span className="text-xs px-2 py-0.5 rounded-full text-orange-400/70 font-sans" style={{ background: 'rgba(255,140,26,0.08)', border: '1px solid rgba(255,140,26,0.15)' }}>{i.projectType}</span>}
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-white/35 font-sans mb-3">
                            <a href={`mailto:${i.email}`} className="hover:text-orange-400 transition-colors">{i.email}</a>
                            {i.phone && <a href={`tel:${i.phone}`} className="hover:text-orange-400 transition-colors">{i.phone}</a>}
                            <span>{new Date(i.submittedAt).toLocaleString()}</span>
                          </div>
                          <p className="text-white/60 text-sm font-sans leading-relaxed">{i.message}</p>
                        </div>
                        <button onClick={() => handleDeleteInquiry(i.id)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 p-1.5"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <SectionHeader title="Orders" sub="Signature piece order submissions" />
              {orders.length === 0 ? (
                <div className="rounded-xl flex flex-col items-center justify-center py-24 gap-3" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <ClipboardList size={32} className="text-white/15" />
                  <p className="text-white/25 text-sm font-sans">No orders yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map(o => (
                    <div key={o.id} className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <p className="font-display uppercase tracking-wider text-white text-sm">{o.name}</p>
                            <span className="text-orange-400/80 font-sans text-sm">{o.productTitle}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full text-orange-400/70" style={{ background: 'rgba(255,140,26,0.08)', border: '1px solid rgba(255,140,26,0.15)' }}>{o.productPrice}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-white/35 font-sans mb-2">
                            <a href={`mailto:${o.email}`} className="hover:text-orange-400 transition-colors">{o.email}</a>
                            {o.phone && <a href={`tel:${o.phone}`} className="hover:text-orange-400 transition-colors">{o.phone}</a>}
                            <span>{new Date(o.submittedAt).toLocaleString()}</span>
                          </div>
                          {o.address && <p className="text-white/45 text-xs font-sans">{o.address}</p>}
                        </div>
                        <button onClick={() => handleDeleteOrder(o.id)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 p-1.5"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div>
              <SectionHeader title="Site Settings" sub="Update contact information shown on the site" />
              <div className="max-w-lg rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="label-sm">Phone Number</label>
                    <input value={settings.phone} onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))} className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                  </div>
                  <div>
                    <label className="label-sm">Email</label>
                    <input value={settings.email} onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                  </div>
                  <div>
                    <label className="label-sm">Facebook Handle</label>
                    <input value={settings.facebook} onChange={e => setSettings(s => ({ ...s, facebook: e.target.value }))} className={inputCls()} style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                  </div>
                  <button onClick={saveSettings} className="flex items-center justify-center gap-2 py-3 rounded-lg font-display uppercase tracking-widest text-sm text-white transition-all mt-2"
                    style={{ background: settingsSaved ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg,#FF4D00,#FF8C1A)', border: settingsSaved ? '1px solid rgba(34,197,94,0.3)' : 'none', boxShadow: settingsSaved ? 'none' : '0 4px 14px rgba(255,77,0,0.25)' }}>
                    {settingsSaved ? <><Check size={14} /> Saved</> : 'Save Settings'}
                  </button>
                  <p className="text-xs text-white/25 font-sans">Settings are saved locally. Refresh the main site to see updates.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {etsyModal.open && (
        <Modal title={etsyModal.editing ? 'Edit Product' : 'Add Shop Product'} onClose={() => setEtsyModal({ open: false, editing: null })}>
          <EtsyForm initial={etsyModal.editing} onClose={() => setEtsyModal({ open: false, editing: null })}
            onSave={p => { etsyModal.editing ? updateEtsy(p) : addEtsy(p); setEtsyModal({ open: false, editing: null }); }} />
        </Modal>
      )}
      {premiumModal.open && (
        <Modal title={premiumModal.editing ? 'Edit Piece' : 'Add Signature Piece'} onClose={() => setPremiumModal({ open: false, editing: null })}>
          <PremiumForm initial={premiumModal.editing} onClose={() => setPremiumModal({ open: false, editing: null })}
            onSave={p => { premiumModal.editing ? updatePremium(p) : addPremium(p); setPremiumModal({ open: false, editing: null }); }} />
        </Modal>
      )}
      {confirm && <Confirm msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
}
