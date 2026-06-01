import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'staff' | 'user'
          branch_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Row']>
      }
      clients: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          national_id: string
          address: string
          branch_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clients']['Row']>
      }
      loans: {
        Row: {
          id: string
          client_id: string
          amount: number
          interest_rate: number
          duration_months: number
          status: 'pending' | 'approved' | 'active' | 'closed' | 'defaulted'
          approved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['loans']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['loans']['Row']>
      }
      repayments: {
        Row: {
          id: string
          loan_id: string
          amount: number
          payment_method: string
          reference: string
          paid_at: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['repayments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['repayments']['Row']>
      }
      attachments: {
        Row: {
          id: string
          client_id: string
          file_name: string
          file_url: string
          file_type: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['attachments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['attachments']['Row']>
      }
    }
  }
}