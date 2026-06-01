# Trinity Microfinance Ltd - Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Supabase account (free tier)
- Vercel account  
- GitHub account (already configured)

### Step 1: Set Up Supabase

1. Go to https://supabase.com
2. Create new project
3. Copy Project URL and Anon Key
4. Run SQL schema in Supabase SQL Editor (see README.md)

### Step 2: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import repository: `masaa24/trinity-microfinance`
3. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = (your Supabase URL)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (your Supabase key)
   SMS_GATEWAY_API_URL = http://192.168.1.100:9090/send
   SMS_SENDER_NAME = TRINITY MF
   ```
4. Click Deploy

### Step 3: Access Your Platform

Your live URL: `https://trinity-microfinance.vercel.app`

### Step 4: First Admin Login

1. Create user in Supabase > Authentication
2. Email: agtnnet@gmail.com
3. Login to platform
4. Configure SMS gateway

---

## Environment Variables Reference

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# SMS Gateway (Required for SMS features)
SMS_GATEWAY_API_URL=http://device-ip:9090/send
SMS_GATEWAY_API_KEY=optional_api_key
SMS_SENDER_NAME=TRINITY MF

# Application
NEXT_PUBLIC_APP_NAME=Trinity Microfinance Ltd
NEXT_PUBLIC_COMPANY_NAME=Masaa24 Networks
NEXT_PUBLIC_HQ_BRANCH=Morogoro
```

---

**Deployment Time:** ~5-10 minutes
**Status:** Production Ready ✅
