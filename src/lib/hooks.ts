'use client';
import { useState, useEffect, useCallback } from 'react';

interface BookmarkData {
  productId: string;
  savedAt: string;
  savedScore: number;
  savedVelocity: number;
}

const STORAGE_KEY = 'tiktok-trend-watchlist';

export function useWatchlist() {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
    setIsLoaded(true);
  }, []);

  const save = useCallback((data: BookmarkData[]) => {
    setBookmarks(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const addBookmark = useCallback((productId: string, score: number, velocity: number) => {
    const newBookmarks = [...bookmarks, {
      productId,
      savedAt: new Date().toISOString(),
      savedScore: score,
      savedVelocity: velocity,
    }];
    save(newBookmarks);
  }, [bookmarks, save]);

  const removeBookmark = useCallback((productId: string) => {
    save(bookmarks.filter(b => b.productId !== productId));
  }, [bookmarks, save]);

  const isBookmarked = useCallback((productId: string) => {
    return bookmarks.some(b => b.productId === productId);
  }, [bookmarks]);

  const getBookmark = useCallback((productId: string) => {
    return bookmarks.find(b => b.productId === productId);
  }, [bookmarks]);

  const exportCSV = useCallback((products: any[]) => {
    const bookmarkedProducts = products.filter(p => isBookmarked(p.id));
    const headers = ['Rank', 'Name', 'Price', 'Commission Rate', 'Sold 7d', 'Velocity WoW', 'Score', 'Category', 'Shop'];
    const rows = bookmarkedProducts.map(p => [
      p.rank, `"${p.name}"`, p.price, `${p.commissionRate}%`, p.sold7d, `${p.velocityWoW}%`, p.affiliateScore, `"${p.category}"`, `"${p.shopName}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watchlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [isBookmarked]);

  return { bookmarks, isLoaded, addBookmark, removeBookmark, isBookmarked, getBookmark, exportCSV };
}
