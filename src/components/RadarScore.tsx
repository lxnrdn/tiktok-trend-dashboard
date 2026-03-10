'use client';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import type { Product } from '@/lib/types';

interface Props {
  products: Product[];
}

const COLORS = ['#FE2C55', '#25F4EE', '#FFD700'];

export function RadarScore({ products }: Props) {
  const categories = ['Volume', 'Komisi', 'Growth', 'Competition'];
  const data = categories.map((cat, i) => {
    const entry: any = { category: cat };
    products.forEach(p => {
      const keys = ['volume', 'commission', 'growth', 'competition'] as const;
      entry[p.id] = p.scoreBreakdown[keys[i]];
    });
    return entry;
  });

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#2A2A2A" />
          <PolarAngleAxis dataKey="category" tick={{ fill: '#8A8A8A', fontSize: 12 }} />
          {products.map((p, i) => (
            <Radar
              key={p.id}
              name={`#${p.rank} ${p.name.slice(0, 20)}`}
              dataKey={p.id}
              stroke={COLORS[i]}
              fill={COLORS[i]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <Legend wrapperStyle={{ fontSize: '11px', color: '#8A8A8A' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
