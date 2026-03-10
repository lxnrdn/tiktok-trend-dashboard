'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowUp, ArrowDown, Bookmark, BookmarkCheck, GitCompare } from 'lucide-react';
import type { Product, SortField, SortOrder, HistoryEntry } from '@/lib/types';
import { formatRupiah, formatNumber, formatPercent, getScoreColor, getVelocityColor, getFlagLabel } from '@/lib/utils';
import { SparklineChart } from './SparklineChart';

interface Props {
  products: Product[];
  history: HistoryEntry[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (product: Product) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

export function ProductTable({ products, history, isBookmarked, onToggleBookmark, compareIds, onToggleCompare }: Props) {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'rank' ? 'asc' : 'desc');
    }
  };

  const sorted = [...products].sort((a, b) => {
    const aVal = a[sortField] as number;
    const bVal = b[sortField] as number;
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-tiktok-muted" />;
    return sortOrder === 'asc' ? <ArrowUp size={12} className="text-tiktok-blue" /> : <ArrowDown size={12} className="text-tiktok-blue" />;
  };

  const columns: { field: SortField; label: string; align?: string }[] = [
    { field: 'rank', label: '#' },
    { field: 'name', label: 'Produk' },
    { field: 'price', label: 'Harga', align: 'right' },
    { field: 'commissionRate', label: 'Komisi', align: 'right' },
    { field: 'sold7d', label: 'Terjual 7h', align: 'right' },
    { field: 'velocityWoW', label: 'Velocity', align: 'right' },
    { field: 'affiliateScore', label: 'Skor', align: 'right' },
  ];

  return (
    <div className="bg-tiktok-card border border-tiktok-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tiktok-border">
              <th className="px-3 py-3 text-left w-10">
                <GitCompare size={14} className="text-tiktok-muted" />
              </th>
              {columns.map(col => (
                <th
                  key={col.field}
                  onClick={() => handleSort(col.field)}
                  className={`px-3 py-3 text-xs font-medium text-tiktok-muted cursor-pointer hover:text-tiktok-text transition-colors ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field} />
                  </span>
                </th>
              ))}
              <th className="px-3 py-3 text-center text-xs font-medium text-tiktok-muted">Trend</th>
              <th className="px-3 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((product) => {
              const productHistory = history.filter(h => h.productId === product.id).sort((a, b) => a.date.localeCompare(b.date));
              return (
                <tr key={product.id} className="border-b border-tiktok-border/50 hover:bg-white/[0.02] transition-colors">
                  {/* Compare checkbox */}
                  <td className="px-3 py-3">
                    <button
                      onClick={() => onToggleCompare(product.id)}
                      disabled={!compareIds.includes(product.id) && compareIds.length >= 3}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        compareIds.includes(product.id)
                          ? 'bg-tiktok-blue border-tiktok-blue text-black'
                          : 'border-tiktok-border hover:border-tiktok-muted disabled:opacity-30'
                      }`}
                    >
                      {compareIds.includes(product.id) && <span className="text-xs font-bold">{compareIds.indexOf(product.id) + 1}</span>}
                    </button>
                  </td>

                  {/* Rank */}
                  <td className="px-3 py-3">
                    <span className={`text-sm font-bold ${product.rank <= 3 ? 'text-tiktok-red' : 'text-tiktok-muted'}`}>
                      {product.rank}
                    </span>
                  </td>

                  {/* Product name + flags */}
                  <td className="px-3 py-3 max-w-[300px]">
                    <Link href={`/product/${product.id}`} className="group">
                      <p className="text-sm font-medium text-tiktok-text group-hover:text-tiktok-blue transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-tiktok-muted">{product.shopName}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.flags.slice(0, 3).map(flag => (
                          <span key={flag} className={`flag-badge flag-${flag}`}>{getFlagLabel(flag)}</span>
                        ))}
                      </div>
                    </Link>
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm text-tiktok-text">{formatRupiah(product.price)}</span>
                  </td>

                  {/* Commission */}
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm text-purple-400">{product.commissionRate}%</span>
                    <p className="text-xs text-tiktok-muted">{formatRupiah(product.commission)}/pcs</p>
                  </td>

                  {/* Sold 7d */}
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm text-tiktok-text">{formatNumber(product.sold7d)}</span>
                  </td>

                  {/* Velocity */}
                  <td className="px-3 py-3 text-right">
                    <span className={`text-sm font-medium ${getVelocityColor(product.velocityWoW)}`}>
                      {formatPercent(product.velocityWoW)}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-3 py-3 text-right">
                    <span className={`text-sm font-bold ${getScoreColor(product.affiliateScore)}`}>
                      {product.affiliateScore}
                    </span>
                  </td>

                  {/* Sparkline */}
                  <td className="px-3 py-3">
                    <div className="w-20 h-8">
                      <SparklineChart data={productHistory.map(h => h.sold7d)} />
                    </div>
                  </td>

                  {/* Bookmark */}
                  <td className="px-3 py-3">
                    <button
                      onClick={() => onToggleBookmark(product)}
                      className="p-1 hover:bg-white/5 rounded transition-colors"
                    >
                      {isBookmarked(product.id) ? (
                        <BookmarkCheck size={16} className="text-tiktok-red" />
                      ) : (
                        <Bookmark size={16} className="text-tiktok-muted hover:text-tiktok-text" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
