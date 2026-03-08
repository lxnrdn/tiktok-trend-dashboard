export interface Product {
  id: number
  rank: number
  name: string
  price: number
  commission: number
  commissionIdr: number
  score: number
  tier: string
  tierLabel: string
  orders7d: number
  orders30d: number
  rating: number
  reviews: number
  creators: number
  velocityWoW: number
  store: string
  category: string
  flags: string[]
  redFlags: string[]
  analysis: string
  earningsEstimate: string
  scoreDimensions: {
    salesVolume: number
    commissionRate: number
    salesVelocity: number
    creatorCompetition: number
    productQuality: number
  }
  contentStrategy: {
    hooks: string[]
    formats: string[]
    hashtags: string[]
    bestTimes: string[]
  } | null
}

export interface Category {
  name: string
  label: string
  orders7d: number
  trending: string[]
  driver: string
  recommendation: string
  color: string
}

export interface RisingStar {
  rank: number
  name: string
  velocityWoW: number
  price: number
  category: string
}

export interface ReportData {
  meta: {
    date: string
    title: string
    totalProducts: number
    hottestCategory: string
    avgScore: number
    topCommissionProduct: string
    topCommissionRate: number
    marketGMV: string
    growthYoY: string
  }
  products: Product[]
  categories: Category[]
  risingStars: RisingStar[]
}
