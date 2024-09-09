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

    // Check if bucket exists, create if it doesn't
    const { data: bucketData } = await supabase.storage.getBucket(bucketName)
    if (!bucketData) {
      await supabase.storage.createBucket(bucketName, { public: true })
    }

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

    // Use Replicate to process the image
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: publicUrlData.publicUrl,
          prompt: "Enhance this image"
        }
      }
    );

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl, processedImage: output })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}