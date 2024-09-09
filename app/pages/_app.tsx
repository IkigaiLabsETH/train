import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

function MyApp({ Component, pageProps }: AppProps) {
    const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      {session ? (
        <Component {...pageProps} />
      ) : (
        <div>
          <h1>You need to log in</h1>
          <a href="/login">Go to Login</a>
        </div>
      )}
    </>
  )
}

export default MyApp