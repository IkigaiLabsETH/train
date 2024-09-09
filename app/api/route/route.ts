import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Replicate from 'replicate' // Add this import

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const replicateApiToken = process.env.REPLICATE_API_TOKEN

if (!supabaseUrl || !supabaseAnonKey || !replicateApiToken) {
  throw new Error('Missing environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Initialize Replicate client
const replicate = new Replicate({
  auth: replicateApiToken,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bucketName = 'user-uploads'

    // Check if the bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return NextResponse.json({ error: `Error listing buckets: ${listError.message}` }, { status: 500 })
    }

    const bucketExists = buckets.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      console.error(`Bucket '${bucketName}' not found`)
      return NextResponse.json({ error: `Bucket '${bucketName}' not found` }, { status: 500 })
    }

    // Upload the image to Supabase
    const { data: uploadData, error } = await supabase.storage
      .from(bucketName)
      .upload(`public/${file.name}`, file)

    if (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json({ error: `Error uploading file: ${error.message}` }, { status: 500 })
    }

    // Use uploadData if needed, or remove if not used
    console.log('File uploaded successfully:', uploadData)

    // Get public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`public/${file.name}`)

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

// Function to train Flux Pro model
// If trainFluxProModel is not used, remove it
// If it's used elsewhere, add a comment to disable the ESLint rule
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function trainFluxProModel(data: unknown): Promise<void> {
  // Implementation here
}