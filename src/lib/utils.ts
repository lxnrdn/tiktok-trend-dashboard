export function formatRupiah(num: number): string {
  if (num >= 1_000_000_000) return `Rp${(num / 1_000_000_000).toFixed(1)}M`;
  if (num >= 1_000_000) return `Rp${(num / 1_000_000).toFixed(1)}jt`;
  if (num >= 1_000) return `Rp${(num / 1_000).toFixed(0)}rb`;
  return `Rp${num.toLocaleString('id-ID')}`;
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString('id-ID');
}

export function formatPercent(num: number): string {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
}

export function getTierColor(tier: string): string {
  switch (tier) {
    case 'TIER_1': return 'text-yellow-400';
    case 'TIER_2': return 'text-tiktok-blue';
    case 'TIER_3': return 'text-tiktok-muted';
    default: return 'text-tiktok-muted';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-yellow-400';
  if (score >= 75) return 'text-green-400';
  if (score >= 65) return 'text-tiktok-blue';
  return 'text-tiktok-muted';
}

export function getVelocityColor(velocity: number): string {
  if (velocity >= 100) return 'text-red-400';
  if (velocity >= 50) return 'text-orange-400';
  if (velocity >= 20) return 'text-green-400';
  return 'text-tiktok-muted';
}

export function getFlagLabel(flag: string): string {
  const labels: Record<string, string> = {
    'VIRAL_VIDEO': 'Viral Video',
    'TRENDING_HASHTAG': 'Trending',
    'SEASONAL_FIT': 'Seasonal',
    'LOW_COMPETITION': 'Low Comp',
    'HIGH_COMMISSION': 'High Comm',
    'RISING_STAR': 'Rising Star',
  };
  return labels[flag] || flag;
}
