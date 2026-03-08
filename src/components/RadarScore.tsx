'use client'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Product } from '@/lib/types'

export default function RadarScore({ product }: { product: Product }) {
  const data = [
    { dimension: 'Sales Vol.', value: product.scoreDimensions.salesVolume, fullMark: 100 },
    { dimension: 'Komisi', value: product.scoreDimensions.commissionRate, fullMark: 100 },
    { dimension: 'Velocity', value: product.scoreDimensions.salesVelocity, fullMark: 100 },
    { dimension: 'Low Kompetisi', value: product.scoreDimensions.creatorCompetition, fullMark: 100 },
    { dimension: 'Kualitas', value: product.scoreDimensions.productQuality, fullMark: 100 },
  ]

  return (
    <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5">
      <h3 className="text-sm font-bold text-white mb-3">Skor 5 Dimensi</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="#2e2e3e" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#555', fontSize: 10 }} />
          <Radar name="Skor" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip contentStyle={{ background: '#1e1e2e', border: '1px solid #2e2e3e', borderRadius: '8px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
