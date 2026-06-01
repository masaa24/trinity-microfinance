import { sendSms } from '@/lib/sms-gateway'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/sms/send
 * Send SMS via gateway
 * 
 * Body:
 * {
 *   "phone": "+255712345678",
 *   "message": "Your loan has been approved"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, message } = body

    if (!phone || !message) {
      return NextResponse.json(
        { error: 'Phone and message are required' },
        { status: 400 }
      )
    }

    const result = await sendSms({ phone, message })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message_id: result.message_id,
    })
  } catch (error) {
    console.error('SMS API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}