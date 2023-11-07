'use server'

import { type SigninFormData } from '@/components/shared/signin-form'
import { getServerActionClient } from '@/api/supabase/server-action'
import { revalidatePath } from 'next/cache'

export const handleSignup = async (values: SigninFormData) => {
  const supabase = getServerActionClient()
  const { error } = await supabase.auth.signUp({
    ...values,
  })

  console.log({ error })

  if (error) {
    return error
  }

  revalidatePath('/sign-up')
}
