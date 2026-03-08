'use client'
import { useState } from 'react'
import { Product } from '@/lib/types'
import { formatRupiah, formatNumber, getScoreColor, getFlagColor } from '@/lib/utils'

type SortKey = 'rank' | 'score' | 'price' | 'commission' | 'orders7d' | 'velocityWoW' | 'creators'

export default function ProductTable({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortAsc, setSortAsc] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory)
  const sorted = [...filtered].sort((a, b) => {
    const diff = (a[sortKey] as number) - (b[sortKey] as number)
    return sortAsc ? diff : -diff
  })

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(key === 'rank') }
  }

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <th
      className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-orange-400 transition-colors ${sortKey === field ? 'text-orange-400' : 'text-zinc-500'}`}
      onClick={() => handleSort(field)}
    >
      {label} {sortKey === field ? (sortAsc ? '\u2191' : '\u2193') : ''}
    </th>
  )

  return (
    <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl overflow-hidden mb-8">
      <div className="px-5 py-4 border-b border-[#2e2e3e] flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white">Top 10 Produk Afiliasi</h2>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterCategory === cat ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-[#252540] text-zinc-400 border border-[#2e2e3e] hover:border-[#3e3e4e]'}`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#181825]">
            <tr>
              <SortHeader label="#" field="rank" />
              <th className="px-3 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Produk</th>
              <SortHeader label="Skor" field="score" />
              <SortHeader label="Harga" field="price" />
              <SortHeader label="Komisi" field="commission" />
              <SortHeader label="Order/7d" field="orders7d" />
              <SortHeader label="Velocity" field="velocityWoW" />
              <SortHeader label="Kreator" field="creators" />
              <th className="px-3 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Flags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2e2e3e]">
            {sorted.map(product => (
              <tr key={product.id} className="hover:bg-[#252540] transition-colors cursor-pointer" onClick={() => window.location.href = `/product/${product.id}`}>
                <td className="px-3 py-4 text-sm font-bold text-zinc-300">#{product.rank}</td>
                <td className="px-3 py-4">
                  <div className="text-sm font-medium text-white max-w-[200px] truncate">{product.name}</div>
                  <div className="text-xs text-zinc-500">{product.store} \u00b7 {product.category}</div>
                </td>
                <td className="px-3 py-4">
                  <span className={`text-sm font-bold ${getScoreColor(product.score)}`}>{product.score}</span>
                </td>
                <td className="px-3 py-4 text-sm text-zinc-300">{formatRupiah(product.price)}</td>
                <td className="px-3 py-4">
                  <div className="text-sm text-green-400 font-medium">{product.commission}%</div>
                  <div className="text-xs text-zinc-500">{formatRupiah(product.commissionIdr)}/sale</div>
                </td>
                <td className="px-3 py-4 text-sm text-zinc-300">{formatNumber(product.orders7d)}</td>
                <td className="px-3 py-4">
                  <span className={`text-sm font-medium ${product.velocityWoW > 100 ? 'text-red-400' : product.velocityWoW > 50 ? 'text-orange-400' : 'text-zinc-400'}`}>
                    +{product.velocityWoW}%
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-zinc-300">{product.creators}</td>
                <td className="px-3 py-4">
                  <div className="flex gap-1 flex-wrap max-w-[200px]">
                    {product.flags.slice(0, 2).map(flag => (
                      <span key={flag} className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getFlagColor(flag)}`}>
                        {flag.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {product.redFlags.map(flag => (
                      <span key={flag} className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getFlagColor(flag)}`}>
                        \u26a0 {flag.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
