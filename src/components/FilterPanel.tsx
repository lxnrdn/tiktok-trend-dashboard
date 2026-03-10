'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FilterState, Category } from '@/lib/types';

interface Props {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: Category[];
}

const allFlags = ['VIRAL_VIDEO', 'TRENDING_HASHTAG', 'SEASONAL_FIT', 'LOW_COMPETITION', 'HIGH_COMMISSION', 'RISING_STAR'];

export function FilterPanel({ filters, onFilterChange, categories }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const update = (partial: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const hasActiveFilters = filters.category || filters.priceMin > 0 || filters.priceMax < 500000 || filters.commissionMin > 0 || filters.commissionMax < 20 || filters.scoreMin > 0 || filters.flags.length > 0;

  const clearAll = () => {
    onFilterChange({
      search: filters.search,
      category: '',
      priceMin: 0,
      priceMax: 500000,
      commissionMin: 0,
      commissionMax: 20,
      scoreMin: 0,
      flags: [],
    });
  };

  return (
    <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4 mb-6">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tiktok-muted" />
          <input
            type="text"
            placeholder="Cari produk atau toko..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full bg-tiktok-dark border border-tiktok-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-tiktok-text placeholder:text-tiktok-muted focus:outline-none focus:border-tiktok-blue/50 transition-colors"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            isExpanded || hasActiveFilters
              ? 'bg-tiktok-red/10 border-tiktok-red/30 text-tiktok-red'
              : 'bg-tiktok-dark border-tiktok-border text-tiktok-muted hover:text-tiktok-text'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filter
          {hasActiveFilters && (
            <span className="bg-tiktok-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>
          )}
        </button>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-tiktok-border space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category */}
            <div>
              <label className="text-xs text-tiktok-muted mb-1.5 block">Kategori</label>
              <select
                value={filters.category}
                onChange={(e) => update({ category: e.target.value })}
                className="w-full bg-tiktok-dark border border-tiktok-border rounded-lg px-3 py-2 text-sm text-tiktok-text focus:outline-none focus:border-tiktok-blue/50"
              >
                <option value="">Semua Kategori</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div>
              <label className="text-xs text-tiktok-muted mb-1.5 block">Harga Maks: Rp{filters.priceMax.toLocaleString('id-ID')}</label>
              <input
                type="range"
                min={0}
                max={500000}
                step={5000}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: Number(e.target.value) })}
                className="w-full accent-tiktok-red"
              />
            </div>

            {/* Commission range */}
            <div>
              <label className="text-xs text-tiktok-muted mb-1.5 block">Komisi Min: {filters.commissionMin}%</label>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={filters.commissionMin}
                onChange={(e) => update({ commissionMin: Number(e.target.value) })}
                className="w-full accent-tiktok-blue"
              />
            </div>

            {/* Score min */}
            <div>
              <label className="text-xs text-tiktok-muted mb-1.5 block">Skor Min: {filters.scoreMin}</label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={filters.scoreMin}
                onChange={(e) => update({ scoreMin: Number(e.target.value) })}
                className="w-full accent-green-400"
              />
            </div>
          </div>

          {/* Flag filters */}
          <div>
            <label className="text-xs text-tiktok-muted mb-1.5 block">Flags</label>
            <div className="flex flex-wrap gap-2">
              {allFlags.map(flag => (
                <button
                  key={flag}
                  onClick={() => {
                    const newFlags = filters.flags.includes(flag)
                      ? filters.flags.filter(f => f !== flag)
                      : [...filters.flags, flag];
                    update({ flags: newFlags });
                  }}
                  className={`flag-badge flag-${flag} cursor-pointer transition-opacity ${
                    filters.flags.includes(flag) ? 'opacity-100 ring-1 ring-white/20' : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  {flag.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-tiktok-red hover:text-red-300">
              <X size={12} /> Hapus semua filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
