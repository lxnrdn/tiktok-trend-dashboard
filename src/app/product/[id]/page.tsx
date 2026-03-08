import reportData from '@/data/report.json'
import { ReportData, Product } from '@/lib/types'
import { formatRupiah, formatNumber, getScoreColor, getScoreBg, getFlagColor } from '@/lib/utils'
import RadarScore from '@/components/RadarScore'

export function generateStaticParams() {
  return (reportData as ReportData).products.map(p => ({ id: String(p.id) }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const data = reportData as ReportData
  const product = data.products.find(p => p.id === parseInt(params.id)) as Product

  if (!product) return <div className="text-center text-zinc-500 py-20">Produk tidak ditemukan</div>

  return (
    <div>
      <a href="/" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors mb-4 inline-block">\u2190 Kembali ke Dashboard</a>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-black text-zinc-600">#{product.rank}</span>
            <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          </div>
          <p className="text-sm text-zinc-500">{product.store} \u00b7 {product.category}</p>
        </div>
        <div className={`px-4 py-2 rounded-xl border ${getScoreBg(product.score)}`}>
          <p className={`text-3xl font-black ${getScoreColor(product.score)}`}>{product.score}</p>
          <p className="text-[10px] text-zinc-400 text-center">{product.tier}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Harga', value: formatRupiah(product.price) },
            { label: 'Komisi', value: `${product.commission}%` },
            { label: 'Komisi/Sale', value: formatRupiah(product.commissionIdr) },
            { label: 'Order 7 Hari', value: formatNumber(product.orders7d) },
            { label: 'Order 30 Hari', value: formatNumber(product.orders30d) },
            { label: 'Rating', value: `${product.rating}/5.0` },
            { label: 'Review', value: formatNumber(product.reviews) },
            { label: 'Kreator Aktif', value: product.creators.toString() },
            { label: 'Velocity WoW', value: `+${product.velocityWoW}%` },
          ].map(stat => (
            <div key={stat.label} className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-lg p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        <RadarScore product={product} />
      </div>

      {/* Flags */}
      <div className="flex gap-2 flex-wrap mb-6">
        {product.flags.map(flag => (
          <span key={flag} className={`px-3 py-1 text-xs font-medium rounded-full border ${getFlagColor(flag)}`}>
            {flag.replace(/_/g, ' ')}
          </span>
        ))}
        {product.redFlags.map(flag => (
          <span key={flag} className={`px-3 py-1 text-xs font-medium rounded-full border ${getFlagColor(flag)}`}>
            \u26a0 {flag.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      {/* Analysis */}
      <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 mb-6">
        <h3 className="text-sm font-bold text-white mb-2">Analisis</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">{product.analysis}</p>
        <div className="mt-3 p-3 bg-[#181825] rounded-lg">
          <p className="text-xs text-zinc-500">Estimasi Penghasilan</p>
          <p className="text-sm font-medium text-green-400">{product.earningsEstimate}</p>
        </div>
      </div>

      {/* Content Strategy */}
      {product.contentStrategy && (
        <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Strategi Konten</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Hook Ideas</p>
              <div className="space-y-2">
                {product.contentStrategy.hooks.map((hook, i) => (
                  <div key={i} className="p-2 bg-[#181825] rounded-lg text-sm text-zinc-300">\u201c{hook}\u201d</div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Format Konten</p>
              <div className="space-y-2">
                {product.contentStrategy.formats.map((fmt, i) => (
                  <div key={i} className="p-2 bg-[#181825] rounded-lg text-sm text-zinc-300">{fmt}</div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Hashtags</p>
              <div className="flex flex-wrap gap-1">
                {product.contentStrategy.hashtags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Waktu Posting Terbaik</p>
              <div className="space-y-2">
                {product.contentStrategy.bestTimes.map((time, i) => (
                  <div key={i} className="p-2 bg-[#181825] rounded-lg text-sm text-zinc-300">{time}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
