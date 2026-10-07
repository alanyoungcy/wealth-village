# Vercel Deployment Guide

## Frontend-Only Deployment (Recommended for Vercel)

Since Vercel specializes in frontend hosting, we'll deploy the frontend and you can host the backend separately (Railway, Render, or AWS).

### Option 1: Frontend Only on Vercel

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variable** in Vercel Dashboard:
   - `VITE_API_URL` = Your backend API URL

### Option 2: Full Stack (Vercel + Backend Hosting)

**Deploy Frontend to Vercel:**
```bash
cd frontend
vercel --prod
```

**Deploy Backend to Railway/Render:**
1. Create account on Railway.app or Render.com
2. Connect GitHub repository
3. Deploy backend folder
4. Get backend URL
5. Update frontend `VITE_API_URL` in Vercel

### Environment Variables Needed

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-url.com
```

**Backend:**
```
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### Quick Deploy Commands

**Frontend:**
```bash
cd frontend
npm run build
vercel --prod
```

**Verify build locally first:**
```bash
cd frontend
npm run build
npm run preview
```

## Notes

- Vercel is optimized for static sites and serverless functions
- Python FastAPI backend needs separate hosting
- Frontend will work independently with mock data if backend is unavailable
- CORS settings will need to be updated for production domains

## Troubleshooting

**Build fails on Vercel:**
- Check Node.js version in Vercel settings (use 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

**CORS errors:**
- Add your Vercel domain to backend's ALLOWED_ORIGINS
- Update API_BASE URL in frontend code
