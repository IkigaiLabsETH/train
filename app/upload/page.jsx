"use client";

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Image from 'next/image'
import { Session } from '@supabase/supabase-js'

export default function Upload() {
  const [imageFile, setImageFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [session, setSession] = useState(null)

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

  const handleUpload = async () => {
    if (!imageFile) return setUploadStatus('Please select an image.')
    if (!session) return setUploadStatus('Please sign in to upload.')

    try {
      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'user-uploads'

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${imageFile.name}`, imageFile)

      if (error) throw error

      setUploadStatus(`File uploaded successfully: ${data.path}`)
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path)
      setImageUrl(urlData.publicUrl)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus(`Error uploading file: ${error.message}`)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Upload an Image</h1>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button onClick={handleUpload} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Upload</button>
        {uploadStatus && <p style={{ marginTop: '20px', color: '#333' }}>{uploadStatus}</p>}
        {imageUrl && (
          <Image 
            src={imageUrl} 
            alt="Uploaded file" 
            width={500} 
            height={300} 
            style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  )
}

export default function Upload({ session }) {
}
