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
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`public/${file.name}`, file)

    if (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json({ error: `Error uploading file: ${error.message}` }, { status: 500 })
    }

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
async function trainFluxProModel(imagePath: string, model: any) {
  try {
    const publicUrl = supabase.storage.from('user-uploads').getPublicUrl(imagePath).data.publicUrl

    // Start the training process
    const training = await replicate.trainings.create(
      "ostris/flux-dev-lora-trainer:4ffd32160efd92e956d39c5338a9b8fbafca58e03f791f6d8011f3e20e8ea6fa",
      {
        input: {
          input_images: publicUrl,
          steps: 1000,
          // Add other required input parameters
        },
        destination: `${model.owner}/${model.name}`,
      }
    );

    console.log(`Training started: ${training.status}`)
    console.log(`Training URL: https://replicate.com/p/${training.id}`)

    return training
  } catch (error) {
    return { error }
  }
}