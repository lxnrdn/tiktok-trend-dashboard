'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, TrendingUp, Users, Star, ShoppingBag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { RadarScore } from '@/components/RadarScore';
import { useWatchlist } from '@/lib/hooks';
import { formatRupiah, formatNumber, formatPercent, getScoreColor, getVelocityColor, getFlagLabel } from '@/lib/utils';
import type { Product, HistoryEntry } from '@/lib/types';

import productsData from '@/data/products.json';
import historyData from '@/data/history.json';

const products = productsData as Product[];
const history = historyData as HistoryEntry[];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find(p => p.id === id);
  const { isBookmarked, addBookmark, removeBookmark, getBookmark } = useWatchlist();

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-tiktok-muted">Produk tidak ditemukan</p>
        <Link href="/" className="text-tiktok-blue text-sm mt-2 inline-block">Kembali ke Dashboard</Link>
      </div>
    );
  }

  const productHistory = history.filter(h => h.productId === id).sort((a, b) => a.date.localeCompare(b.date));
  const bookmark = getBookmark(id);

  const handleBookmark = () => {
    if (isBookmarked(id)) removeBookmark(id);
    else addBookmark(id, product.affiliateScore, product.velocityWoW);
  };

  const chartData = productHistory.map(h => ({
    date: h.date.slice(5),
    sold7d: h.sold7d,
    velocity: h.velocityWoW,
    score: h.affiliateScore,
  }));

  const metrics = [
    { label: 'Harga', value: formatRupiah(product.price), icon: ShoppingBag, color: 'text-tiktok-text' },
    { label: 'Komisi', value: `${product.commissionRate}% (${formatRupiah(product.commission)}/pcs)`, icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Terjual 7 Hari', value: formatNumber(product.sold7d), icon: ShoppingBag, color: 'text-tiktok-blue' },
    { label: 'Proyeksi 30 Hari', value: formatNumber(product.sold30d), icon: TrendingUp, color: 'text-green-400' },
    { label: 'Rating', value: `${product.rating}/5 (${formatNumber(product.reviewCount)} review)`, icon: Star, color: 'text-yellow-400' },
    { label: 'Kreator Aktif', value: formatNumber(product.creatorCount), icon: Users, color: 'text-orange-400' },
    { label: 'Velocity WoW', value: formatPercent(product.velocityWoW), icon: TrendingUp, color: getVelocityColor(product.velocityWoW) },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-tiktok-muted hover:text-tiktok-text mb-3">
            <ArrowLeft size={14} /> Kembali
          </Link>
          <h1 className="text-xl font-bold text-white">{product.name}</h1>
          <p className="text-sm text-tiktok-muted mt-1">{product.shopName} &middot; {product.category}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.flags.map(flag => (
              <span key={flag} className={`flag-badge flag-${flag}`}>{getFlagLabel(flag)}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleBookmark} className="p-2 bg-tiktok-card border border-tiktok-border rounded-lg hover:bg-white/5 transition-colors">
            {isBookmarked(id) ? <BookmarkCheck size={18} className="text-tiktok-red" /> : <Bookmark size={18} className="text-tiktok-muted" />}
          </button>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(product.affiliateScore)}`}>{product.affiliateScore}</div>
            <div className="text-xs text-tiktok-muted">{product.tier.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* Score change indicator if bookmarked */}
      {bookmark && (
        <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-3 mb-4">
          <p className="text-xs text-tiktok-muted">Sejak di-bookmark ({new Date(bookmark.savedAt).toLocaleDateString('id-ID')}):</p>
          <div className="flex gap-4 mt-1">
            <span className={`text-sm ${product.affiliateScore > bookmark.savedScore ? 'text-green-400' : product.affiliateScore < bookmark.savedScore ? 'text-red-400' : 'text-tiktok-muted'}`}>
              Skor: {bookmark.savedScore} &rarr; {product.affiliateScore} ({product.affiliateScore > bookmark.savedScore ? '+' : ''}{(product.affiliateScore - bookmark.savedScore).toFixed(1)})
            </span>
            <span className={`text-sm ${product.velocityWoW > bookmark.savedVelocity ? 'text-green-400' : product.velocityWoW < bookmark.savedVelocity ? 'text-red-400' : 'text-tiktok-muted'}`}>
              Velocity: {formatPercent(bookmark.savedVelocity)} &rarr; {formatPercent(product.velocityWoW)}
            </span>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-tiktok-card border border-tiktok-border rounded-xl p-3">
            <p className="text-xs text-tiktok-muted mb-1">{m.label}</p>
            <p className={`text-sm font-semibold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Why Promote */}
      <div className="bg-gradient-to-r from-tiktok-red/10 to-tiktok-blue/10 border border-tiktok-border rounded-xl p-4 mb-6">
        <h3 className="text-sm font-medium text-white mb-2">Mengapa Promosikan?</h3>
        <p className="text-sm text-tiktok-text leading-relaxed">{product.whyPromote}</p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend */}
        <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
          <h3 className="text-sm font-medium text-tiktok-muted mb-4">Trend Penjualan 7 Hari</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#25F4EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="date" stroke="#8A8A8A" tick={{ fontSize: 11 }} />
                <YAxis stroke="#8A8A8A" tick={{ fontSize: 11 }} tickFormatter={(v) => formatNumber(v)} />
                <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="sold7d" stroke="#25F4EE" fill="url(#salesGrad)" strokeWidth={2} name="Terjual 7h" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Score */}
        <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
          <h3 className="text-sm font-medium text-tiktok-muted mb-4">Score Breakdown</h3>
          <RadarScore products={[product]} />
        </div>
      </div>

      {/* Velocity trend */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
        <h3 className="text-sm font-medium text-tiktok-muted mb-4">Velocity & Skor Afiliasi</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#8A8A8A" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#FE2C55" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#25F4EE" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }} />
              <Line yAxisId="left" type="monotone" dataKey="velocity" stroke="#FE2C55" strokeWidth={2} name="Velocity %" dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="score" stroke="#25F4EE" strokeWidth={2} name="Skor Afiliasi" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
