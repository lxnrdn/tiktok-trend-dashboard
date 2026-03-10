import Link from 'next/link';
import { Tag, TrendingUp, ShoppingBag } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { Category } from '@/lib/types';

import categoriesData from '@/data/categories.json';

const categories = categoriesData as Category[];

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Kategori</h1>
      <p className="text-sm text-tiktok-muted mb-6">Explore trend per kategori fashion</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="bg-tiktok-card border border-tiktok-border rounded-xl p-5 hover:border-tiktok-blue/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-tiktok-blue/10 p-2.5 rounded-lg">
                <Tag size={18} className="text-tiktok-blue" />
              </div>
              <span className="text-xs text-tiktok-muted">{cat.productCount} produk</span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-tiktok-blue transition-colors">{cat.name}</h3>
            <p className="text-xs text-tiktok-muted mt-1">Top: {cat.topProduct}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-tiktok-border">
              <div>
                <p className="text-xs text-tiktok-muted">Avg Skor</p>
                <p className="text-sm font-semibold text-green-400">{cat.avgScore.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-xs text-tiktok-muted">Avg Komisi</p>
                <p className="text-sm font-semibold text-purple-400">{cat.avgCommission}%</p>
              </div>
              <div>
                <p className="text-xs text-tiktok-muted">Total Terjual</p>
                <p className="text-sm font-semibold text-tiktok-blue">{formatNumber(cat.totalSold7d)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
