import { forgotPasswordAction } from "../../actions";
import FormMessage from '../../components/form-message'
import { SubmitButton } from '../../components/submit-button'
import Input from '../../components/ui/input'
import Label from '../../components/ui/label'
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Metadata } from 'next'

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <form action={forgotPasswordAction} className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="you@example.com" required />
          <SubmitButton pendingText="Resetting...">
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams.message?.toString() ?? ''} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password',
};
