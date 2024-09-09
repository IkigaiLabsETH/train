'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' // Add this import
import { Session } from '@supabase/supabase-js'
import Login from '../components/Login'
import Upload from '../components/Upload'

export default function TrainPage() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Commenting out the login flow
  // const handleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'github', // or any other provider you're using
  //   })
  //   if (error) console.error('Error logging in:', error)
  // }

  // if (!session) {
  //   return <Login onLogin={handleLogin} />
  // }

  // For testing purposes, assume the user is logged in
  const mockSession = { user: { id: 'mock-user-id' } } as Session;
  return <Upload session={mockSession} />
}
