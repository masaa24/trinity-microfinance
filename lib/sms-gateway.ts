/**
 * SMS Gateway Integration - HTTP-based SMS via your Android/iOS device
 * 
 * Configuration:
 * - Install SMS Gateway API app on your Android device
 * - Set SMS_GATEWAY_API_URL to your device's local IP + port (e.g., http://192.168.1.100:9090)
 * - SMS_SENDER_NAME will be "TRINITY MF"
 */

interface SendSmsParams {
  phone: string
  message: string
}

interface SmsGatewayResponse {
  success: boolean
  message_id?: string
  error?: string
}

export async function sendSms(params: SendSmsParams): Promise<SmsGatewayResponse> {
  const apiUrl = process.env.SMS_GATEWAY_API_URL
  const apiKey = process.env.SMS_GATEWAY_API_KEY
  const senderName = process.env.SMS_SENDER_NAME || 'TRINITY MF'

  if (!apiUrl) {
    console.warn('SMS_GATEWAY_API_URL not configured. SMS sending disabled.')
    return {
      success: false,
      error: 'SMS gateway not configured',
    }
  }

  try {
    const payload = {
      phone: params.phone,
      message: params.message,
      sender: senderName,
      ...(apiKey && { api_key: apiKey }),
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return {
        success: false,
        error: `SMS Gateway error: ${response.statusText}`,
      }
    }

    const data = await response.json()

    return {
      success: true,
      message_id: data.message_id || data.id,
    }
  } catch (error) {
    console.error('SMS sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Predefined SMS Templates
 */
export const smsTemplates = {
  loanApproved: (clientName: string, amount: number) =>
    `Hi ${clientName}, your loan of TZS ${amount.toLocaleString()} has been approved. Visit Trinity MF to collect your funds. - TRINITY MF`,

  loanReminder: (clientName: string, dueAmount: number, dueDate: string) =>
    `Hi ${clientName}, your loan repayment of TZS ${dueAmount.toLocaleString()} is due on ${dueDate}. Reply CONFIRM to acknowledge. - TRINITY MF`,

  paymentReceived: (clientName: string, amount: number, balance: number) =>
    `Hi ${clientName}, we received TZS ${amount.toLocaleString()}. Outstanding balance: TZS ${balance.toLocaleString()}. - TRINITY MF`,

  overdueNotice: (clientName: string, amount: number, daysOverdue: number) =>
    `Hi ${clientName}, your loan is ${daysOverdue} days overdue. Amount due: TZS ${amount.toLocaleString()}. Please visit Trinity MF office. - TRINITY MF`,
}