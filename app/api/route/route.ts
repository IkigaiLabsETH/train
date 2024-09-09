import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Upload the image to Supabase
    const { data, error } = await supabase.storage
      .from('user-uploads')
      .upload(`public/${file.name}`, file)

    if (error) {
      return NextResponse.json({ error: `Error uploading file: ${error.message}` }, { status: 500 })
    }

    // Trigger the model inference on Replicate's Flux Pro model
    const replicateResponse = await trainFluxProModel(data.path)
    if (replicateResponse.error) {
      return NextResponse.json({ error: `Error training model: ${replicateResponse.error}` }, { status: 500 })
    }

    return NextResponse.json({ message: 'File uploaded and model training started successfully', path: data.path })
  } catch (error) {
    console.error('Server-side error:', error)
    return NextResponse.json(
      { error: 'An error occurred', details: (error as Error).message },
      { status: 500 }
    )
  }
}

// Function to call Replicate API for Flux Pro model
async function trainFluxProModel(imagePath: string) {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "b9b23575b1459c85f3d468da89ee3e26bf25a64a9b7fffa4cb89a7eecb0f4c09", // Flux Pro version ID
        input: {
          image: supabase.storage.from('user-uploads').getPublicUrl(imagePath).data.publicUrl,
          // Add any additional input parameters needed for the model
        }
      })
    })

    return await response.json()
  } catch (error) {
    return { error }
  }
}