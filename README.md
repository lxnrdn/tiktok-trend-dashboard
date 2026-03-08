# TikTok Trend Dashboard

Dashboard analisis produk trending fashion & aksesoris TikTok Shop Indonesia untuk affiliator.

## Fitur

- **Dashboard Overview** — Summary cards, tabel ranking produk interaktif (sortable & filterable), bar chart kategori
- **Detail Produk** — Radar chart skor 5 dimensi, stats lengkap, strategi konten, flag badges
- **Tren Kategori** — Cards per kategori dengan order, trending products, rekomendasi

## Tech Stack

- Next.js 14 (App Router, Static Export)
- TypeScript
- Tailwind CSS
- Recharts

## Setup Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka http://localhost:3000
```

## Deploy ke Vercel

### Cara 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Cara 2: GitHub + Vercel

1. Push folder `dashboard/` ke GitHub repository
2. Buka [vercel.com](https://vercel.com) dan import repo
3. Set **Root Directory** ke `dashboard/` (jika bukan root)
4. Framework Preset: **Next.js**
5. Klik **Deploy**

### Cara 3: Static Export (GitHub Pages / Netlify)

```bash
npm run build
# Output di folder `out/` — upload ke hosting static manapun
```

## Struktur Data

Dashboard membaca dari `src/data/report.json`. Untuk update data:

1. Ganti isi `src/data/report.json` dengan data laporan terbaru
2. Format JSON harus mengikuti interface `ReportData` di `src/lib/types.ts`
3. Re-build: `npm run build`

## Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Dashboard utama dengan summary, chart, dan tabel produk |
| `/product/[id]` | Detail produk dengan radar chart dan strategi konten |
| `/categories` | Overview semua kategori fashion |
