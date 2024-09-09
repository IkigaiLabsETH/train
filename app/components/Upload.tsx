import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Upload({ session }: { session: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return setUploadStatus('Please select a file to upload.')

    const { data, error } = await supabase
      .from('uploads')
      .insert([{ user_id: session.user.id, file_name: file.name }])

    if (error) {
      console.error('Error uploading file:', error.message)
      setUploadStatus(`Error: ${error.message}`)
    } else {
      console.log('File uploaded successfully:', data)
      setUploadStatus('File uploaded successfully!')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border rounded w-full"
      />
      <button 
        onClick={handleUpload} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-4 text-center text-gray-700">{uploadStatus}</p>}
    </div>
  )
}