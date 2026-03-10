'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Download, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useWatchlist } from '@/lib/hooks';
import { formatRupiah, formatNumber, formatPercent, getScoreColor, getVelocityColor, getFlagLabel } from '@/lib/utils';
import type { Product } from '@/lib/types';

import productsData from '@/data/products.json';

const products = productsData as Product[];

export default function WatchlistPage() {
  const { bookmarks, isLoaded, removeBookmark, exportCSV } = useWatchlist();

  if (!isLoaded) {
    return <div className="text-center py-20 text-tiktok-muted">Loading...</div>;
  }

  const watchedProducts = bookmarks
    .map(b => {
      const product = products.find(p => p.id === b.productId);
      if (!product) return null;
      return { ...product, bookmark: b };
    })
    .filter(Boolean) as (Product & { bookmark: any })[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Watchlist</h1>
          <p className="text-sm text-tiktok-muted mt-1">{watchedProducts.length} produk disimpan</p>
        </div>
        {watchedProducts.length > 0 && (
          <button
            onClick={() => exportCSV(products)}
            className="flex items-center gap-2 px-4 py-2 bg-tiktok-card border border-tiktok-border rounded-lg text-sm text-tiktok-text hover:bg-white/5 transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
        )}
      </div>

      {watchedProducts.length === 0 ? (
        <div className="text-center py-20 bg-tiktok-card border border-tiktok-border rounded-xl">
          <Bookmark size={40} className="mx-auto text-tiktok-muted mb-4" />
          <p className="text-tiktok-muted mb-2">Belum ada produk di watchlist</p>
          <p className="text-xs text-tiktok-muted mb-4">Klik ikon bookmark di tabel produk untuk menambahkan</p>
          <Link href="/" className="text-tiktok-blue text-sm">Ke Dashboard</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {watchedProducts.map(wp => {
            const scoreDiff = wp.affiliateScore - wp.bookmark.savedScore;
            const velocityDiff = wp.velocityWoW - wp.bookmark.savedVelocity;
            const ScoreIcon = scoreDiff > 0 ? TrendingUp : scoreDiff < 0 ? TrendingDown : Minus;
            const scoreColor = scoreDiff > 0 ? 'text-green-400' : scoreDiff < 0 ? 'text-red-400' : 'text-tiktok-muted';

            return (
              <div key={wp.id} className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <Link href={`/product/${wp.id}`} className="flex-1 min-w-0 group">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-tiktok-muted">#{wp.rank}</span>
                      <h3 className="text-sm font-medium text-white group-hover:text-tiktok-blue transition-colors truncate">{wp.name}</h3>
                    </div>
                    <p className="text-xs text-tiktok-muted mt-0.5">{wp.shopName} &middot; {wp.category}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {wp.flags.map(f => <span key={f} className={`flag-badge flag-${f}`}>{getFlagLabel(f)}</span>)}
                    </div>
                  </Link>

                  <div className="flex items-center gap-5 ml-4">
                    {/* Score change */}
                    <div className="text-right">
                      <p className="text-xs text-tiktok-muted">Skor</p>
                      <div className="flex items-center gap-1">
                        <span className={`text-lg font-bold ${getScoreColor(wp.affiliateScore)}`}>{wp.affiliateScore}</span>
                        <div className={`flex items-center gap-0.5 ${scoreColor}`}>
                          <ScoreIcon size={12} />
                          <span className="text-xs">{scoreDiff > 0 ? '+' : ''}{scoreDiff.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Current metrics */}
                    <div className="text-right">
                      <p className="text-xs text-tiktok-muted">Velocity</p>
                      <p className={`text-sm font-medium ${getVelocityColor(wp.velocityWoW)}`}>{formatPercent(wp.velocityWoW)}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-tiktok-muted">Terjual</p>
                      <p className="text-sm font-medium text-tiktok-text">{formatNumber(wp.sold7d)}</p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeBookmark(wp.id)}
                      className="p-2 text-tiktok-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Saved info */}
                <div className="mt-2 pt-2 border-t border-tiktok-border/50 text-xs text-tiktok-muted">
                  Disimpan {new Date(wp.bookmark.savedAt).toLocaleDateString('id-ID')} &middot;
                  Skor saat simpan: {wp.bookmark.savedScore} &middot;
                  Velocity saat simpan: {formatPercent(wp.bookmark.savedVelocity)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
