import { ExternalLink, Users, Heart, Package, Award } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { Creator } from '@/lib/types';

import creatorsData from '@/data/creators.json';

const creators = creatorsData as Creator[];
const sorted = [...creators].sort((a, b) => b.followers - a.followers);

export default function CreatorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Top Kreator Fashion</h1>
      <p className="text-sm text-tiktok-muted mb-6">15 kreator fashion terpopuler di TikTok Shop Indonesia</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((creator, index) => (
          <div key={creator.id} className="bg-tiktok-card border border-tiktok-border rounded-xl p-5 hover:border-tiktok-blue/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < 3 ? 'bg-gradient-to-br from-tiktok-red to-tiktok-blue text-white' : 'bg-tiktok-dark text-tiktok-muted'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-white">{creator.name}</h3>
                    {creator.isVerified && <Award size={12} className="text-tiktok-blue" />}
                  </div>
                  <p className="text-xs text-tiktok-muted">{creator.handle}</p>
                </div>
              </div>
              <a href={creator.profileUrl} target="_blank" rel="noopener noreferrer" className="text-tiktok-muted hover:text-tiktok-blue transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <Users size={13} className="text-tiktok-blue" />
                <div>
                  <p className="text-xs text-tiktok-muted">Followers</p>
                  <p className="text-sm font-semibold text-tiktok-text">{formatNumber(creator.followers)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={13} className="text-tiktok-red" />
                <div>
                  <p className="text-xs text-tiktok-muted">Total Likes</p>
                  <p className="text-sm font-semibold text-tiktok-text">{formatNumber(creator.totalLikes)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package size={13} className="text-purple-400" />
                <div>
                  <p className="text-xs text-tiktok-muted">Produk</p>
                  <p className="text-sm font-semibold text-tiktok-text">{creator.productsPromoted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award size={13} className="text-green-400" />
                <div>
                  <p className="text-xs text-tiktok-muted">Avg Komisi</p>
                  <p className="text-sm font-semibold text-tiktok-text">{creator.avgCommission}%</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-tiktok-border">
              <span className="text-xs text-tiktok-muted">Top kategori: </span>
              <span className="text-xs text-tiktok-blue">{creator.topCategory}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
