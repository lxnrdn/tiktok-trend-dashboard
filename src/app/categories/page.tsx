import reportData from '@/data/report.json'
import { ReportData } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import CategoryChart from '@/components/CategoryChart'

export default function CategoriesPage() {
  const data = reportData as ReportData

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Tren Kategori</h2>
      <p className="text-sm text-zinc-500 mb-6">Laporan {data.meta.date} \u00b7 TikTok Shop Indonesia</p>

      <CategoryChart categories={data.categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.categories.map(cat => (
          <div key={cat.name} className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 hover:border-[#3e3e4e] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
              </div>
              <span className="px-2 py-0.5 bg-[#252540] text-[10px] font-medium text-zinc-400 rounded-full">{cat.label}</span>
            </div>

            <p className="text-2xl font-bold text-white mb-1">{formatNumber(cat.orders7d)}</p>
            <p className="text-xs text-zinc-500 mb-3">order / 7 hari</p>

            <div className="mb-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Produk Trending</p>
              <div className="flex flex-wrap gap-1">
                {cat.trending.map(item => (
                  <span key={item} className="px-2 py-0.5 bg-[#181825] text-xs text-zinc-300 rounded">{item}</span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Driver</p>
              <p className="text-xs text-zinc-300">{cat.driver}</p>
            </div>

            <div className="p-3 bg-[#181825] rounded-lg">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Rekomendasi</p>
              <p className="text-xs text-zinc-300">{cat.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
