'use client'
import { ReportData } from '@/lib/types'
import { formatRupiah, formatNumber } from '@/lib/utils'

export default function SummaryCards({ data }: { data: ReportData }) {
  const topProduct = data.products[0]
  const totalOrders = data.products.reduce((sum, p) => sum + p.orders7d, 0)

  const cards = [
    { label: 'Total Order 7 Hari', value: formatNumber(totalOrders), sub: `${data.meta.totalProducts} produk`, color: 'from-blue-500 to-blue-600' },
    { label: 'Rata-rata Skor', value: data.meta.avgScore.toFixed(1), sub: 'dari 100', color: 'from-orange-500 to-orange-600' },
    { label: 'Kategori Terpanas', value: data.meta.hottestCategory, sub: formatNumber(data.categories[0].orders7d) + ' order', color: 'from-green-500 to-green-600' },
    { label: 'Top Komisi/Sale', value: formatRupiah(topProduct.commissionIdr), sub: topProduct.name.slice(0, 25) + '...', color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 hover:border-[#3e3e4e] transition-colors">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{card.label}</p>
          <p className="text-2xl font-bold text-white">{card.value}</p>
          <p className="text-xs text-zinc-400 mt-1">{card.sub}</p>
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${card.color} mt-3`} />
        </div>
      ))}
    </div>
  )
}
