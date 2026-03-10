'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tag, Users, Bookmark, BarChart3, Menu, X, TrendingUp } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/categories', label: 'Kategori', icon: Tag },
  { href: '/creators', label: 'Kreator', icon: Users },
  { href: '/compare', label: 'Bandingkan', icon: BarChart3 },
  { href: '/watchlist', label: 'Watchlist', icon: Bookmark },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-tiktok-card p-2 rounded-lg border border-tiktok-border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-tiktok-card border-r border-tiktok-border z-40 transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-tiktok-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tiktok-red to-tiktok-blue flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">TikTok Trends</h1>
              <p className="text-xs text-tiktok-muted">Indonesia Fashion</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-tiktok-red/10 text-tiktok-red border border-tiktok-red/20'
                    : 'text-tiktok-muted hover:text-tiktok-text hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Market Score */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-tiktok-border">
          <div className="bg-gradient-to-r from-tiktok-red/10 to-tiktok-blue/10 rounded-lg p-4">
            <p className="text-xs text-tiktok-muted mb-1">Skor Pasar Hari Ini</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-tiktok-blue">8.5</span>
              <span className="text-sm text-tiktok-muted">/10</span>
            </div>
            <p className="text-xs text-green-400 mt-1">SANGAT BULLISH</p>
          </div>
        </div>
      </aside>
    </>
  );
}
