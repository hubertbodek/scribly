'use server'

import { revalidatePath } from 'next/cache'

import { type SigninFormData } from '@/components/shared/signin-form'
import { getServerActionClient } from '@/api/supabase/server-action'
import { createDefaultHandleFromEmail } from '@/lib/create-default-handle'
import { assertUser } from '@/lib/assert-user'

export const handleSignup = async (values: SigninFormData) => {
  const supabase = getServerActionClient()
  const { data, error } = await supabase.auth.signUp({
    ...values,
  })

  if (error) {
    return error
  }

  assertUser(data?.user)

  const defaultHandle = createDefaultHandleFromEmail(values.email)

  try {
    await tryGenerateUniqueHandle(defaultHandle, data.user.id)
    revalidatePath('/sign-up')
  } catch (error) {
    console.error(error)
  }
}

const tryGenerateUniqueHandle = async (possibleHandle: string, userId: string, suffix?: string) => {
  const supabase = getServerActionClient()
  const handle = suffix ? `${possibleHandle}-${suffix}` : possibleHandle

  const { error } = await supabase.from('profiles').update({ handle }).eq('id', userId).select()

  if (error) {
    const randomPart = `${Math.floor(Math.random() * 1000)}`
    await tryGenerateUniqueHandle(possibleHandle, userId, randomPart)
  }
}
