'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardStats {
  totalClients: number
  totalLoans: number
  activeLoans: number
  outstandingBalance: number
  overdueLoans: number
  totalRepayments: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalLoans: 0,
    activeLoans: 0,
    outstandingBalance: 0,
    overdueLoans: 0,
    totalRepayments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
        }

        setStats({
          totalClients: 0,
          totalLoans: 0,
          activeLoans: 0,
          outstandingBalance: 0,
          overdueLoans: 0,
          totalRepayments: 0,
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Clients</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalClients}
                    </p>
                  </div>
                  <div className="text-blue-600 text-4xl">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Loans</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.activeLoans}
                    </p>
                  </div>
                  <div className="text-green-600 text-4xl">📊</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Outstanding Balance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      TZS {stats.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-orange-600 text-4xl">💰</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Overdue Loans</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                      {stats.overdueLoans}
                    </p>
                  </div>
                  <div className="text-red-600 text-4xl">⚠️</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Loans</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalLoans}
                    </p>
                  </div>
                  <div className="text-purple-600 text-4xl">📑</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Repayments</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalRepayments}
                    </p>
                  </div>
                  <div className="text-indigo-600 text-4xl">✅</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition font-medium">
                  Add New Client
                </button>
                <button className="p-4 border border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition font-medium">
                  Create Loan
                </button>
                <button className="p-4 border border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition font-medium">
                  Record Payment
                </button>
                <button className="p-4 border border-orange-300 rounded-lg text-orange-600 hover:bg-orange-50 transition font-medium">
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}