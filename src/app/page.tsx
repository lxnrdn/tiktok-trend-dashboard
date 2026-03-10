'use client';
import { useState, useMemo } from 'react';
import { SummaryCards } from '@/components/SummaryCards';
import { FilterPanel } from '@/components/FilterPanel';
import { ProductTable } from '@/components/ProductTable';
import { TrendChart } from '@/components/TrendChart';
import { useWatchlist } from '@/lib/hooks';
import { Clock } from 'lucide-react';
import type { Product, FilterState } from '@/lib/types';

import productsData from '@/data/products.json';
import historyData from '@/data/history.json';
import categoriesData from '@/data/categories.json';
import metaData from '@/data/meta.json';

const products = productsData as Product[];
const history = historyData as any[];
const categories = categoriesData as any[];
const meta = metaData as any;

export default function DashboardPage() {
  const { isBookmarked, addBookmark, removeBookmark, isLoaded } = useWatchlist();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    priceMin: 0,
    priceMax: 500000,
    commissionMin: 0,
    commissionMax: 20,
    scoreMin: 0,
    flags: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.shopName.toLowerCase().includes(q)) return false;
      }
      if (filters.category && p.categorySlug !== filters.category) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (p.commissionRate < filters.commissionMin) return false;
      if (p.affiliateScore < filters.scoreMin) return false;
      if (filters.flags.length > 0 && !filters.flags.some(f => p.flags.includes(f))) return false;
      return true;
    });
  }, [filters]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const handleToggleBookmark = (product: Product) => {
    if (isBookmarked(product.id)) {
      removeBookmark(product.id);
    } else {
      addBookmark(product.id, product.affiliateScore, product.velocityWoW);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-tiktok-muted mt-1">Trend Fashion TikTok Shop Indonesia</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-tiktok-muted">
          <Clock size={12} />
          <span>Update: {new Date(meta.lastUpdated).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards products={products} meta={meta} />

      {/* Trend Charts */}
      <div className="mb-6">
        <TrendChart history={history} products={products} />
      </div>

      {/* Filters */}
      <FilterPanel filters={filters} onFilterChange={setFilters} categories={categories} />

      {/* Compare bar - show when products selected */}
      {compareIds.length > 0 && (
        <div className="bg-tiktok-blue/10 border border-tiktok-blue/30 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-tiktok-blue">
            {compareIds.length} produk dipilih untuk perbandingan
          </span>
          <div className="flex gap-2">
            <button onClick={() => setCompareIds([])} className="text-xs px-3 py-1.5 rounded-lg bg-tiktok-dark text-tiktok-muted hover:text-white transition-colors">
              Batal
            </button>
            <a
              href={`/compare?ids=${compareIds.join(',')}`}
              className="text-xs px-3 py-1.5 rounded-lg bg-tiktok-blue text-black font-medium hover:bg-tiktok-blue/80 transition-colors"
            >
              Bandingkan
            </a>
          </div>
        </div>
      )}

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        history={history}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        compareIds={compareIds}
        onToggleCompare={toggleCompare}
      />

      {/* Results count */}
      <div className="mt-3 text-xs text-tiktok-muted text-center">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </div>
    </div>
  );
}
