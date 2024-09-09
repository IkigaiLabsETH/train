import { signInAction } from "../../../app/actions";
import FormMessage from '../../components/form-message'
import { SubmitButton } from '../../components/submit-button'
import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Link from "next/link";

// Update the prop type to be more specific
export default function Login({ searchParams }: { searchParams: { message?: string } }) {
  return (
    // Add a more semantic structure with header and main tags
    <>
      <header>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </header>
      <main>
        {/* Add proper form attributes for better accessibility and UX */}
        <form className="flex-1 flex flex-col min-w-64 mt-8" action={signInAction} method="POST">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-xs text-foreground underline"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                value=""
                onChange={() => {}}
                // Remove id, name, placeholder, and required props
              />
            </div>
            <SubmitButton pendingText="Signing In...">
              Sign in
            </SubmitButton>
            {/* Only render FormMessage if there's a message */}
            {searchParams.message && <FormMessage message={searchParams.message} />}
          </div>
        </form>
      </main>
    </>
  );
}
