import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Upload({ session }: { session: any }) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const { data, error } = await supabase
      .from('uploads')
      .insert([{ user_id: session.user.id, file_name: file.name }])

    if (error) {
      console.error('Error uploading file:', error.message)
    } else {
      console.log('File uploaded successfully:', data)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}