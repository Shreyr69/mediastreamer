# Vercel Deployment Guide for Streamix

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- YouTube Data API key

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Important**: Make sure `.env` is in your `.gitignore` file (it should already be there).

### 2. Import Project to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the Vite framework

### 3. Configure Environment Variables

In the Vercel project settings:

1. Go to "Settings" → "Environment Variables"
2. Add the following variable:
   - **Name**: `VITE_VIDEO_API_KEY`
   - **Value**: Your YouTube Data API key
   - **Environment**: Production, Preview, Development (select all)
3. Click "Save"

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete (~2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## Build Configuration (Already Set)

The following files are already configured:

- ✅ `vercel.json` - Handles client-side routing
- ✅ `package.json` - Build scripts configured
- ✅ `.gitignore` - Excludes .env file
- ✅ `.env.example` - Template for environment variables

## Post-Deployment

### Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables Updates

If you need to update your API key:

1. Go to "Settings" → "Environment Variables"
2. Edit the variable
3. Redeploy the project

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### API Key Not Working

- Verify the environment variable name is exactly `VITE_VIDEO_API_KEY`
- Make sure you selected all environments when adding the variable
- Redeploy after adding/updating environment variables

### Routing Issues (404 on refresh)

- Verify `vercel.json` exists with the rewrite configuration
- It should already be configured correctly

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Repository imported to Vercel
- [ ] Environment variable `VITE_VIDEO_API_KEY` added
- [ ] Deployment successful
- [ ] App accessible at Vercel URL
- [ ] All features working (search, watch, history)

## Support

For issues specific to:

- **Vercel**: https://vercel.com/docs
- **Vite**: https://vitejs.dev/
- **YouTube API**: https://developers.google.com/youtube/v3
