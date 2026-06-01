'use client'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Trinity Microfinance</h1>
          <p className="text-gray-600 text-sm">Admin Login</p>
        </div>
        <div className="bg-blue-50 p-4 rounded text-center">
          <p className="text-gray-700">Login system will be enabled after database setup</p>
        </div>
      </div>
    </div>
  )
}
