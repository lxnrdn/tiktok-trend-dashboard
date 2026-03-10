'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X as XIcon } from 'lucide-react';
import { RadarScore } from '@/components/RadarScore';
import { formatRupiah, formatNumber, formatPercent, getScoreColor, getVelocityColor, getFlagLabel } from '@/lib/utils';
import type { Product } from '@/lib/types';

import productsData from '@/data/products.json';

const products = productsData as Product[];

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids') || '';
  const ids = idsParam.split(',').filter(Boolean);
  const compareProducts = ids.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

  if (compareProducts.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-tiktok-muted mb-2">Pilih minimal 2 produk untuk dibandingkan</p>
        <p className="text-xs text-tiktok-muted mb-4">Gunakan checkbox di tabel produk di Dashboard</p>
        <Link href="/" className="text-tiktok-blue text-sm">Kembali ke Dashboard</Link>
      </div>
    );
  }

  const allFlags = [...new Set(compareProducts.flatMap(p => p.flags))];
  
  const metricRows: { label: string; key: string; format: (v: any) => string; best: string }[] = [
    { label: 'Skor Afiliasi', key: 'affiliateScore', format: (v) => Number(v).toFixed(1), best: 'max' },
    { label: 'Harga', key: 'price', format: (v) => formatRupiah(v), best: 'context' },
    { label: 'Komisi Rate', key: 'commissionRate', format: (v) => `${v}%`, best: 'max' },
    { label: 'Komisi/pcs', key: 'commission', format: (v) => formatRupiah(v), best: 'max' },
    { label: 'Terjual 7 Hari', key: 'sold7d', format: (v) => formatNumber(v), best: 'max' },
    { label: 'Proyeksi 30 Hari', key: 'sold30d', format: (v) => formatNumber(v), best: 'max' },
    { label: 'Velocity WoW', key: 'velocityWoW', format: (v) => formatPercent(v), best: 'max' },
    { label: 'Rating', key: 'rating', format: (v) => `${v}/5`, best: 'max' },
    { label: 'Review', key: 'reviewCount', format: (v) => formatNumber(v), best: 'max' },
    { label: 'Kreator Aktif', key: 'creatorCount', format: (v) => formatNumber(v), best: 'context' },
    { label: 'Tier', key: 'tier', format: (v) => String(v).replace('_', ' '), best: 'none' },
  ];

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-tiktok-muted hover:text-tiktok-text mb-4">
        <ArrowLeft size={14} /> Kembali
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6">Perbandingan Produk</h1>

      {/* Radar Chart */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4 mb-6">
        <h3 className="text-sm font-medium text-tiktok-muted mb-2">Score Breakdown</h3>
        <RadarScore products={compareProducts} />
      </div>

      {/* Comparison Table */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tiktok-border">
              <th className="px-4 py-3 text-left text-xs text-tiktok-muted w-40">Metrik</th>
              {compareProducts.map(p => (
                <th key={p.id} className="px-4 py-3 text-center">
                  <Link href={`/product/${p.id}`} className="text-sm font-medium text-tiktok-text hover:text-tiktok-blue transition-colors">
                    #{p.rank} {p.name.slice(0, 25)}...
                  </Link>
                  <p className="text-xs text-tiktok-muted">{p.shopName}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metricRows.map(row => {
              const values = compareProducts.map(p => (p as any)[row.key]);
              const maxVal = row.best === 'max' ? Math.max(...values.filter(v => typeof v === 'number')) : null;
              
              return (
                <tr key={row.key} className="border-b border-tiktok-border/50">
                  <td className="px-4 py-3 text-xs text-tiktok-muted">{row.label}</td>
                  {compareProducts.map((p, i) => {
                    const val = (p as any)[row.key];
                    const isBest = maxVal !== null && val === maxVal;
                    return (
                      <td key={p.id} className={`px-4 py-3 text-center text-sm ${isBest ? 'text-green-400 font-semibold' : 'text-tiktok-text'}`}>
                        {row.format(val)}
                        {isBest && <span className="text-green-400 ml-1">&#9733;</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Flags row */}
            <tr className="border-b border-tiktok-border/50">
              <td className="px-4 py-3 text-xs text-tiktok-muted">Flags</td>
              {compareProducts.map(p => (
                <td key={p.id} className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {allFlags.map(flag => (
                      <span key={flag} className={`flag-badge flag-${flag} ${p.flags.includes(flag) ? 'opacity-100' : 'opacity-20'}`}>
                        {getFlagLabel(flag)}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Share link */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
        <p className="text-xs text-tiktok-muted mb-2">Share link perbandingan:</p>
        <code className="text-xs text-tiktok-blue bg-tiktok-dark px-3 py-1.5 rounded block overflow-x-auto">
          {typeof window !== 'undefined' ? window.location.href : `/compare?ids=${ids.join(',')}`}
        </code>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-tiktok-muted">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
