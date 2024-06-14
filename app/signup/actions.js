'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
    const supabase = createClient()

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const emailExists = async (email) => {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)

      if (error) {
        console.error(error)
        return true
      }

      if (data.length > 0) {
        return true
      }

      return false
    }

    if (await emailExists(data.email)) {
      return { error: 'Email already exists' }
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
