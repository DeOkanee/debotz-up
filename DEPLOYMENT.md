# Debotz UP - Setup Vercel

## Installation & Deployment

### 1. Push ke GitHub
```bash
git add .
git commit -m "Add Vercel backend proxy"
git push origin master
```

### 2. Deploy ke Vercel
- Buka https://vercel.com
- Click "New Project"
- Import repository `debotz-up`
- Click "Deploy"

### 3. Set Environment Variables
Setelah deploy, buka Vercel dashboard:

1. Pilih project **debotz-up**
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan:
   - **Name**: `PIXELDRAIN_API_KEY`
   - **Value**: `4ace14e5-1427-4ad4-ae6d-e403b97c8d2d`
   - **Environments**: Pilih semuanya (Production, Preview, Development)
4. Click "Save"

### 4. Redeploy
- Setelah menambah env vars, klik **Deployments** → klik deploy terbaru → **Redeploy**

## Cara Kerja

### Local (localhost)
```
Client ──(CORS Proxy)──> corsproxy.io ──> Pixeldrain API
```

### Production (Vercel)
```
Client ──> /api/upload ──> Backend (Vercel) ──> Pixeldrain API
  └──────────────────────────────────┘
         (Same Origin, No CORS)
```

## Testing di Production

Upload file dari https://debotz-up.vercel.app seharusnya bekerja tanpa CORS error.

## Troubleshooting

Jika masih error:
1. Pastikan env var `PIXELDRAIN_API_KEY` sudah tersetting di Vercel
2. Cek Vercel Logs: Dashboard → Deployments → klik deploy → Logs
3. Clear browser cache dan reload

## File Structure
```
debotz-up/
├── index.html          (Frontend)
├── api/
│   └── upload.js       (Backend - Vercel serverless)
├── vercel.json         (Konfigurasi Vercel)
└── README.md           (Ini)
```
