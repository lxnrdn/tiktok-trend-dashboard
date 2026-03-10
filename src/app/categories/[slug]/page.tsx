'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatRupiah, formatNumber, formatPercent, getScoreColor, getVelocityColor, getFlagLabel } from '@/lib/utils';
import type { Product, Category } from '@/lib/types';

import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

const products = productsData as Product[];
const categories = categoriesData as Category[];

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.categorySlug === slug).sort((a, b) => b.affiliateScore - a.affiliateScore);

  if (!category) {
    return (
      <div className="text-center py-20">
        <p className="text-tiktok-muted">Kategori tidak ditemukan</p>
        <Link href="/categories" className="text-tiktok-blue text-sm mt-2 inline-block">Kembali</Link>
      </div>
    );
  }

  const chartData = categoryProducts.map(p => ({
    name: p.name.slice(0, 20) + '...',
    score: p.affiliateScore,
    sold: p.sold7d,
  }));

  return (
    <div>
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-tiktok-muted hover:text-tiktok-text mb-4">
        <ArrowLeft size={14} /> Semua Kategori
      </Link>
      <h1 className="text-2xl font-bold text-white mb-1">{category.name}</h1>
      <p className="text-sm text-tiktok-muted mb-6">{category.productCount} produk &middot; Avg Skor {category.avgScore.toFixed(1)} &middot; Avg Komisi {category.avgCommission}%</p>

      {/* Bar chart */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4 mb-6">
        <h3 className="text-sm font-medium text-tiktok-muted mb-4">Skor Afiliasi per Produk</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="name" stroke="#8A8A8A" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
              <YAxis stroke="#8A8A8A" tick={{ fontSize: 11 }} domain={[60, 90]} />
              <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
              <Bar dataKey="score" fill="#FE2C55" radius={[4, 4, 0, 0]} name="Skor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product list */}
      <div className="space-y-3">
        {categoryProducts.map(p => (
          <Link key={p.id} href={`/product/${p.id}`} className="block bg-tiktok-card border border-tiktok-border rounded-xl p-4 hover:border-tiktok-blue/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${p.rank <= 3 ? 'text-tiktok-red' : 'text-tiktok-muted'}`}>#{p.rank}</span>
                  <h3 className="text-sm font-medium text-white truncate">{p.name}</h3>
                </div>
                <p className="text-xs text-tiktok-muted mt-0.5">{p.shopName}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.flags.map(f => <span key={f} className={`flag-badge flag-${f}`}>{getFlagLabel(f)}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-6 ml-4">
                <div className="text-right">
                  <p className="text-xs text-tiktok-muted">Terjual</p>
                  <p className="text-sm font-medium text-tiktok-text">{formatNumber(p.sold7d)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-tiktok-muted">Velocity</p>
                  <p className={`text-sm font-medium ${getVelocityColor(p.velocityWoW)}`}>{formatPercent(p.velocityWoW)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-tiktok-muted">Skor</p>
                  <p className={`text-lg font-bold ${getScoreColor(p.affiliateScore)}`}>{p.affiliateScore}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
