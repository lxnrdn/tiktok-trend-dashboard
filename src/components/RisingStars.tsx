'use client'
import { RisingStar } from '@/lib/types'
import { formatRupiah } from '@/lib/utils'

export default function RisingStars({ stars }: { stars: RisingStar[] }) {
  return (
    <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 mb-8">
      <h2 className="text-lg font-bold text-white mb-4">Rising Stars - Pertumbuhan Tertinggi</h2>
      <div className="space-y-3">
        {stars.map(star => (
          <div key={star.rank} className="flex items-center justify-between p-3 bg-[#181825] rounded-lg hover:bg-[#252540] transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-zinc-600">#{star.rank}</span>
              <div>
                <p className="text-sm font-medium text-white">{star.name}</p>
                <p className="text-xs text-zinc-500">{star.category} \u00b7 {formatRupiah(star.price)}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-red-400">+{star.velocityWoW}%</span>
              <p className="text-[10px] text-zinc-500">WoW Velocity</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
