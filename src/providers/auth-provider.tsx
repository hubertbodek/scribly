import React, { createContext, useContext, useEffect, useState } from 'react'

import { type Session, type User } from '@supabase/supabase-js'
import { getBrowserClient } from '@/api/supabase/browser'

export const AuthContext = createContext<{
  user: User | null
  session: Session | null
  isLoading: boolean
}>({
  user: null,
  session: null,
  isLoading: true,
})

const supabase = getBrowserClient()

export const AuthProvider = (props: any) => {
  const [userSession, setUserSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session)
      setUser(session?.user ?? null)
      setIsloading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserSession(session)
      setUser(session?.user ?? null)
      setIsloading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const value = {
    userSession,
    user,
    isLoading,
  }
  return <AuthContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthContextProvider.')
  }
  return context
}
