'use client';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  data: number[];
  color?: string;
}

export function SparklineChart({ data, color = '#25F4EE' }: Props) {
  const chartData = data.map((value, index) => ({ value, index }));
  const isPositive = data.length >= 2 && data[data.length - 1] >= data[0];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? '#25F4EE' : '#FE2C55'}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
