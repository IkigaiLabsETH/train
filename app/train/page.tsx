'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

export default function TrainPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return setError('Please select an image.')
    if (!session) return setError('Please sign in to upload.')

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'user-uploads'

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${file.name}`, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path)

      // Here you can add logic to send the urlData.publicUrl to your API for training
      // For now, we'll just set it as the result
      setResult(`File uploaded successfully: ${urlData.publicUrl}`)
    } catch (error) {
      console.error('Upload error:', error)
      setError(`Error uploading file: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Train Model</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2">
            Select an image:
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Upload and Train'}
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
      {result && <p className="text-green-500">{result}</p>}
    </div>
  )
}
