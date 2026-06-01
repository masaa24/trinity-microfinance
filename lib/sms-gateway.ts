/**
 * SMS Gateway Integration - HTTP-based SMS via your Android/iOS device
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
  export async function sendSMS(phone: string, message: string) {
  const apiUrl = process.env.SMS_GATEWAY_API_URL
  const senderName = process.env.SMS_SENDER_NAME || 'TRINITY MF'
  console.log(`Sending SMS to ${phone}: ${message}`)  

  if (!apiUrl) {
    return {
      success: false,
      error: 'SMS gateway not configured',
       return { success: true, messageId: 'mock-id' }
    }
  }

  try {
    const payload = {
      phone: params.phone,
      message: params.message,
      sender: senderName,
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

export const smsTemplates = {
  loanApproved: (clientName: string, amount: number) =>
    `Hi ${clientName}, your loan of TZS ${amount.toLocaleString()} has been approved. Visit Trinity MF. - TRINITY MF`,

  loanReminder: (clientName: string, dueAmount: number, dueDate: string) =>
    `Hi ${clientName}, your loan repayment of TZS ${dueAmount.toLocaleString()} is due on ${dueDate}. - TRINITY MF`,

  paymentReceived: (clientName: string, amount: number, balance: number) =>
    `Hi ${clientName}, we received TZS ${amount.toLocaleString()}. Outstanding: TZS ${balance.toLocaleString()}. - TRINITY MF`,
}
