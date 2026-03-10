'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { HistoryEntry, Product } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface Props {
  history: HistoryEntry[];
  products: Product[];
}

const COLORS = ['#FE2C55', '#25F4EE', '#FFD700', '#00FF87', '#FF6B6B', '#845EF7'];

export function TrendChart({ history, products }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    products.slice(0, 3).map(p => p.id)
  );

  // Aggregate data by date
  const dates = [...new Set(history.map(h => h.date))].sort();
  
  const chartData = dates.map(date => {
    const entry: any = { date: date.slice(5) }; // MM-DD format
    selectedProducts.forEach(pid => {
      const h = history.find(h => h.date === date && h.productId === pid);
      if (h) entry[pid] = h.sold7d;
    });
    return entry;
  });

  // Total orders per day
  const totalData = dates.map(date => {
    const dayEntries = history.filter(h => h.date === date);
    const total = dayEntries.reduce((sum, h) => sum + h.sold7d, 0);
    return { date: date.slice(5), total };
  });

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : prev.length < 6 ? [...prev, id] : prev
    );
  };

  return (
    <div className="space-y-6">
      {/* Total Orders Area Chart */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
        <h3 className="text-sm font-medium text-tiktok-muted mb-4">Total Penjualan Harian (Semua Produk)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={totalData}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FE2C55" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#8A8A8A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#8A8A8A" tick={{ fontSize: 11 }} tickFormatter={(v) => formatNumber(v)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                labelStyle={{ color: '#8A8A8A' }}
                formatter={(value: number) => [formatNumber(value), 'Total']}
              />
              <Area type="monotone" dataKey="total" stroke="#FE2C55" fill="url(#totalGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-product Line Chart */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-xl p-4">
        <h3 className="text-sm font-medium text-tiktok-muted mb-3">Trend per Produk (Terjual 7 Hari)</h3>
        
        {/* Product selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {products.slice(0, 10).map((p, i) => (
            <button
              key={p.id}
              onClick={() => toggleProduct(p.id)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                selectedProducts.includes(p.id)
                  ? 'border-white/30 text-white'
                  : 'border-tiktok-border text-tiktok-muted hover:text-tiktok-text'
              }`}
              style={selectedProducts.includes(p.id) ? { backgroundColor: `${COLORS[selectedProducts.indexOf(p.id) % COLORS.length]}20` } : {}}
            >
              #{p.rank} {p.name.slice(0, 20)}...
            </button>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#8A8A8A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#8A8A8A" tick={{ fontSize: 11 }} tickFormatter={(v) => formatNumber(v)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                labelStyle={{ color: '#8A8A8A' }}
                formatter={(value: number, name: string) => {
                  const product = products.find(p => p.id === name);
                  return [formatNumber(value), product ? `#${product.rank} ${product.name.slice(0, 25)}` : name];
                }}
              />
              {selectedProducts.map((pid, i) => (
                <Line
                  key={pid}
                  type="monotone"
                  dataKey={pid}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[i % COLORS.length], r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
