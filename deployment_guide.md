# Production Deployment Guide

Your codebase has been fully validated and successfully built. Below is the direct step-by-step procedure to deploy the website on **Vercel** or **Netlify**.

---

## 1. Local Build Preview
To verify the exact build artifact that will be published:
```bash
npm run build
npx vite preview
```

---

## 2. Deploy via Vercel (Recommended)

1. Sign in or create an account at [Vercel](https://vercel.com).
2. Push your project to your GitHub repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "feat: complete custom GEC application system with biometrics"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
3. From the Vercel dashboard, click **Add New** > **Project**.
4. Import your GitHub repository.
5. In the **Environment Variables** section, enter your Supabase keys exactly as defined in your [.env](file:///Users/lalit/Desktop/ecell2/.env):
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `your-anon-key`
6. Click **Deploy**. Vercel will build and host your production app automatically!

---

## 3. Deploy via Netlify

1. Sign in at [Netlify](https://netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Connect your GitHub account and select your repository.
4. Add the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Go to **Advanced build settings** > **Environment variables** and paste:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy site**.
