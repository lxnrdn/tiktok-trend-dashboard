'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Category } from '@/lib/types'

export default function CategoryChart({ categories }: { categories: Category[] }) {
  const data = categories.map(c => ({
    name: c.name,
    orders: c.orders7d,
    color: c.color
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white">{payload[0].payload.name}</p>
          <p className="text-sm text-orange-400">{payload[0].value.toLocaleString('id-ID')} order/7 hari</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-[#1e1e2e] border border-[#2e2e3e] rounded-xl p-5 mb-8">
      <h2 className="text-lg font-bold text-white mb-4">Order per Kategori (7 Hari)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3e" />
          <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={{ stroke: '#2e2e3e' }} />
          <YAxis tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={{ stroke: '#2e2e3e' }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
