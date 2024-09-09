'use client'

import { useState } from 'react'

export default function TrainPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        console.error('Server response:', data)
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      setResult(data.message)
    } catch (err) {
      console.error('Client-side error:', err)
      setError(`Error: ${(err as Error).message}`)
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
