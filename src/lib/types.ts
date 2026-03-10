// Product data types for TikTok Trend Dashboard

export interface Product {
  id: string;
  rank: number;
  name: string;
  price: number;
  priceMax?: number;
  commission: number;
  commissionRate: number;
  sold7d: number;
  sold30d: number;
  rating: number;
  reviewCount: number;
  creatorCount: number;
  velocityWoW: number;
  affiliateScore: number;
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3';
  shopName: string;
  category: string;
  categorySlug: string;
  flags: string[];
  imageUrl?: string;
  tiktokUrl?: string;
  whyPromote: string;
  scoreBreakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  volume: number;      // 0-25
  commission: number;  // 0-25
  growth: number;      // 0-25
  competition: number; // 0-25
}

export interface HistoryEntry {
  date: string; // YYYY-MM-DD
  productId: string;
  sold7d: number;
  velocityWoW: number;
  affiliateScore: number;
  price: number;
}

export interface Category {
  slug: string;
  name: string;
  productCount: number;
  avgScore: number;
  avgCommission: number;
  topProduct: string;
  totalSold7d: number;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  followers: number;
  totalLikes: number;
  productsPromoted: number;
  avgCommission: number;
  topCategory: string;
  profileUrl: string;
  isVerified: boolean;
}

export interface DashboardMeta {
  lastUpdated: string;
  totalProductsScanned: number;
  dataSource: string;
  marketScore: number;
  marketSentiment: string;
  reportDate: string;
}

export type SortField = 'rank' | 'name' | 'price' | 'commission' | 'commissionRate' | 'sold7d' | 'velocityWoW' | 'affiliateScore' | 'creatorCount' | 'rating';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: string;
  priceMin: number;
  priceMax: number;
  commissionMin: number;
  commissionMax: number;
  scoreMin: number;
  flags: string[];
}
