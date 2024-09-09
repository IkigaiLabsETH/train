import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="text-center">
        <Image
          className="dark:invert mb-8"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Our AI Training Platform</h1>
        <p className="text-xl mb-8">Start training your AI model with just a few clicks.</p>
        <Link
          href="/train"
          className="rounded-full bg-blue-500 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Get Started
        </Link>
      </main>
      <footer className="mt-16 text-center">
        <p className="text-sm text-gray-600">
          Powered by Next.js and AI technologies
        </p>
      </footer>
    </div>
  );
}
