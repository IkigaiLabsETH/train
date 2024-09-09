# NextJS with Supabase

<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22supabase%22%2C%22productSlug%22%3A%22supabase%22%7D%5D)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)


# AI-Driven App Architect

> As AI transforms the coding process, we focus on orchestrating systems and integrating diverse components to deliver innovative solutions at unprecedented speeds.

## Features

- AI-powered development using Cursor and Wispr
- Rapid MVP creation (10x faster than traditional methods)
- Modular project architecture
- Integration of cutting-edge APIs, SDKs, and open-source solutions

## Technologies Used

- Next.js
- React
- Supabase
- Flux AI (via Replicate API)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Key Components

- **Cursor Integration**: Intelligent code suggestions and real-time previews
- **Wispr Flow**: Effortless voice dictation for rapid development
- **Supabase Backend**: User authentication and data storage
- **Flux AI Model**: Image processing and AI model training

## FLUX

To fine-tune the **FLUX Pro** model on Replicate, you can follow these steps:

### Prerequisites:
1. A **Replicate** account.
2. Training images (around 12-20 for best results).
3. A few dollars for running the model (approximately $2 for a full run).

### Fine-Tuning Steps:
1. **Gather Training Data**: 
   - You’ll need a collection of high-quality images (JPG or PNG) representing the concept you want to teach the model. Ensure variety in settings, poses, and lighting to cover different aspects of the subject. 
   - Optionally, you can create captions in a `.txt` file for each image, but it’s not mandatory.

2. **Prepare a Zip File**:
   - Once you have the images, zip them up. This zip file will be uploaded to Replicate for fine-tuning.

3. **Use a Unique Trigger Word**:
   - Choose a unique **trigger word** to activate your specific fine-tuning. This is the term you’ll use in prompts to activate the fine-tuned model (e.g., “MY_TRIGGER”).
   - Avoid common words to prevent clashes with other models.

4. **Start the Fine-Tuning Process**:
   - On Replicate, navigate to the [FLUX.1 fine-tuning page](https://replicate.com/blog/fine-tune-flux).
   - Upload your zip file and fill in the required parameters (e.g., the number of training steps, trigger word, etc.). 
   - For most use cases, leave the defaults for learning rate and other advanced settings.

5. **Monitor Training**:
   - The process usually takes about 20 minutes for 1000 steps and 10 images. You can use Replicate’s web interface or programmatically through the API to track the training progress.

6. **Generate Images**:
   - Once training is complete, you can generate images via the web or through an API. In your prompt, be sure to include the trigger word to use your fine-tuned concept.

7. **Optional: API Integration**:
   - You can integrate the trained model into your app using the Replicate API. The API provides flexibility, allowing you to run and tweak your model programmatically in languages like Python and JavaScript.

With these steps, you’ll be able to fine-tune and customize the **FLUX Pro** model to generate specific images based on the training data you’ve provided.

If you'd like to see more details on this process, you can check out the [Replicate blog](https://replicate.com/blog/fine-tune-flux) and [AI Devin’s guide](https://posts.aidevin.dev/posts/885).


---

*Inspired by the innovative approach showcased at [LIVETHELIFETV](https://livethelife.tv/cursor/)*