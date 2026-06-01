# Trinity Microfinance Ltd
## Microfinance Management System

**Product:** Trinity Microfinance Ltd  
**Company:** Masaa24 Networks  
**Development Team:** Ghostech Team Mbeya  
**Version:** 1.0.0 - Production Ready  

---

## 🚀 Features

### Core Features
- **Client Management**: Full KYC with national ID, address, contacts
- **Loan Origination**: Complete loan application workflow with approval
- **Repayment Tracking**: Manual entry + M-Pesa integration ready
- **SMS Alerts**: HTTP-based SMS gateway via Android/iOS device
- **Document Management**: File attachments and tracking
- **Multi-Branch Support**: Manage multiple branches with role-based access

### Advanced Features
- **Admin Dashboard**: Real-time analytics and KPIs
- **PDF/CSV Export**: Loan statements and reports
- **Audit Trail**: Complete log of all changes
- **PWA/Offline Mode**: Works offline, syncs when online

---

## 📋 Prerequisites

- **Node.js** 18+ 
- **Supabase Account** (free tier at https://supabase.com)
- **Vercel Account** (for deployment)
- **Android/iOS Device** with SMS Gateway app (for SMS)

---

## 🔧 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/masaa24/trinity-microfinance.git
cd trinity-microfinance
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase

1. Go to https://supabase.com and create account
2. Create new project
3. Copy Project URL and Anon Key
4. Run this SQL in Supabase SQL Editor:

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'staff',
  branch_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT now()
);

-- Clients Table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  national_id VARCHAR(50) UNIQUE,
  address TEXT,
  branch_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Loans Table
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) DEFAULT 0,
  duration_months INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  approved_by UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Repayments Table
CREATE TABLE repayments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES loans(id),
  amount DECIMAL(15,2) NOT NULL,
  payment_method VARCHAR(100),
  reference VARCHAR(255),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Attachments Table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  file_name VARCHAR(255),
  file_url TEXT,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);
```

### 4. Configure Environment

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Update with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SMS_GATEWAY_API_URL=http://192.168.1.100:9090/send
SMS_SENDER_NAME=TRINITY MF
```

### 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

---

## 🚀 Deploy to Vercel

1. Go to https://vercel.com/new
2. Import GitHub repo: `masaa24/trinity-microfinance`
3. Add environment variables
4. Deploy!

Your live URL: `https://trinity-microfinance.vercel.app`

---

## 🔐 Admin Setup

1. Create user in Supabase: `agtnnet@gmail.com`
2. Login to platform
3. Configure SMS gateway
4. Start adding clients and loans

---

## 📞 Support

**Team:** Ghostech Team Mbeya  
**Company:** Masaa24 Networks  

---

**Built with ❤️ for Trinity Microfinance Ltd**
