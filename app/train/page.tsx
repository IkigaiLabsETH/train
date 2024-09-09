'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import Upload from '../components/Upload'
import { useRouter } from 'next/navigation'

export default function TrainPage() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) {
      router.push('/sign-in')
    }
  }, [session, router])

  if (!session) {
    return null // or a loading spinner
  }

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2 className="font-medium text-xl mb-4">Upload your files</h2>
      <Upload session={session} />
    </main>
  )
}
