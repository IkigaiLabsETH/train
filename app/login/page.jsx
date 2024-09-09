"use client";

import { supabase } from '../lib/supabaseClient'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) console.log('Error logging in:', error.message)
    else console.log('Check your email for the login link!')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={() => handleLogin(email)} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Login</button>
      </div>
    </div>
  )
}