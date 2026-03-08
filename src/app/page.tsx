import reportData from '@/data/report.json'
import { ReportData } from '@/lib/types'
import SummaryCards from '@/components/SummaryCards'
import ProductTable from '@/components/ProductTable'
import CategoryChart from '@/components/CategoryChart'
import RisingStars from '@/components/RisingStars'

export default function DashboardPage() {
  const data = reportData as ReportData

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            <p className="text-sm text-zinc-500">Laporan {data.meta.date} \u00b7 TikTok Shop Indonesia</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">GMV: {data.meta.marketGMV}</span>
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">YoY: {data.meta.growthYoY}</span>
          </div>
        </div>
      </div>

      <SummaryCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <CategoryChart categories={data.categories} />
        </div>
        <div>
          <RisingStars stars={data.risingStars} />
        </div>
      </div>

      <ProductTable products={data.products} />
    </div>
  )
}
