'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-block">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Trinity Microfinance Ltd</h1>
          <p className="text-xl text-blue-100 mb-2">Microfinance Management System</p>
          <p className="text-lg text-blue-200 mb-8">by Masaa24 Networks - Ghostech Team Mbeya</p>
          
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Admin Login
            </Link>
            <p className="text-blue-100">
              Version 1.0.0 - Production Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}