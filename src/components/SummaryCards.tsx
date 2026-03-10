'use client';
import { TrendingUp, DollarSign, ShoppingBag, Zap } from 'lucide-react';
import type { Product, DashboardMeta } from '@/lib/types';

interface Props {
  products: Product[];
  meta: DashboardMeta;
}

export function SummaryCards({ products, meta }: Props) {
  const avgScore = products.reduce((a, p) => a + p.affiliateScore, 0) / products.length;
  const topVelocity = products.reduce((max, p) => p.velocityWoW > max.velocityWoW ? p : max, products[0]);
  const totalSold = products.reduce((a, p) => a + p.sold7d, 0);

  const cards = [
    {
      label: 'Total Produk',
      value: products.length.toString(),
      sub: `dari ${meta.totalProductsScanned} dipindai`,
      icon: ShoppingBag,
      color: 'text-tiktok-blue',
      bgColor: 'bg-tiktok-blue/10',
    },
    {
      label: 'Rata-rata Skor',
      value: avgScore.toFixed(1),
      sub: `Pasar: ${meta.marketSentiment}`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'Total Terjual (7h)',
      value: totalSold >= 1000000 ? `${(totalSold / 1000000).toFixed(1)}M` : `${(totalSold / 1000).toFixed(0)}K`,
      sub: 'unit minggu ini',
      icon: DollarSign,
      color: 'text-tiktok-red',
      bgColor: 'bg-tiktok-red/10',
    },
    {
      label: 'Velocity Tertinggi',
      value: `+${topVelocity.velocityWoW}%`,
      sub: topVelocity.name.slice(0, 30),
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-tiktok-muted">{card.label}</span>
            <div className={`${card.bgColor} p-2 rounded-lg`}>
              <card.icon size={16} className={card.color} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          <p className="text-xs text-tiktok-muted mt-1 truncate">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
