import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/sms/send
 * Send SMS via gateway
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

    // SMS Gateway integration
    const apiUrl = process.env.SMS_GATEWAY_API_URL
    const senderName = process.env.SMS_SENDER_NAME || 'TRINITY MF'

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'SMS gateway not configured' },
        { status: 500 }
      )
    }

    const payload = {
      phone,
      message,
      sender: senderName,
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `SMS Gateway error: ${response.statusText}` },
        { status: 500 }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message_id: data.message_id || data.id,
    })
  } catch (error) {
    console.error('SMS API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
