"use client";

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setResult('Check your email for the login link!')
      onLogin()
    } catch (error) {
      console.error('Login error:', error)
      setError(`Error logging in: ${(error).message}`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleLogin} className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
      {result && <p className="text-green-500">{result}</p>}
    </div>
  )
}