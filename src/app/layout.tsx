import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TikTok Trend Dashboard - Fashion & Accessories Indonesia',
  description: 'Dashboard analisis produk trending TikTok Shop Indonesia untuk affiliator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen">
          <nav className="border-b border-[#2e2e3e] bg-[#181825] px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">TT</div>
                <div>
                  <h1 className="text-lg font-bold text-white">TikTok Trend Dashboard</h1>
                  <p className="text-xs text-zinc-500">Fashion & Accessories Indonesia</p>
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/" className="text-zinc-300 hover:text-orange-400 transition-colors">Dashboard</a>
                <a href="/categories" className="text-zinc-300 hover:text-orange-400 transition-colors">Kategori</a>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
