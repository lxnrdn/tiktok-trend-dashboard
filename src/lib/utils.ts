export function formatRupiah(num: number): string {
  return 'Rp' + num.toLocaleString('id-ID')
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'jt'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'rb'
  return num.toString()
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-400'
  if (score >= 75) return 'text-orange-400'
  if (score >= 65) return 'text-yellow-400'
  return 'text-red-400'
}

export function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-green-500/20 border-green-500/30'
  if (score >= 75) return 'bg-orange-500/20 border-orange-500/30'
  if (score >= 65) return 'bg-yellow-500/20 border-yellow-500/30'
  return 'bg-red-500/20 border-red-500/30'
}

export function getFlagColor(flag: string): string {
  const colors: Record<string, string> = {
    'VIRAL_VELOCITY': 'bg-red-500/20 text-red-400 border-red-500/30',
    'TRENDING_HASHTAG': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'SEASONAL_RAMADAN': 'bg-green-500/20 text-green-400 border-green-500/30',
    'LOW_COMPETITION': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'LOW_RATING': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'LOW_EARNINGS_PER_SALE': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  }
  return colors[flag] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}
