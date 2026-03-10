import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'TikTok Trend Dashboard - Indonesia Fashion',
  description: 'Real-time TikTok Shop Indonesia fashion trend analytics for affiliators',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen bg-tiktok-dark">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
