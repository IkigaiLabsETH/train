import { signUpAction } from '../../lib/actions'
import FormMessage from '../../components/form-message'
import { SubmitButton } from '../../components/submit-button'
import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Link from "next/link";

export default function SignUp({ searchParams }: { searchParams: { message?: string } }) {
  return (
    <>
      <header>
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </header>
      <main>
        <form className="flex-1 flex flex-col min-w-64 mt-8" action={signUpAction} method="POST">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="********" required />
            </div>
            <SubmitButton pendingText="Signing Up...">
              Sign up
            </SubmitButton>
            {searchParams.message && <FormMessage message={searchParams.message} />}
          </div>
        </form>
      </main>
    </>
  );
}
