"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInPage() {
  return (
    <Card className="mx-auto mt-20 max-w-xs">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense>
          <GoogleSignInButton />
        </Suspense>
      </CardContent>
    </Card>
  );
}
export default SignInPage;

function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <Button
      type="button"
      onClick={() =>
        signIn("google", {
          callbackUrl,
        })
      }
      variant="outline"
      className="w-full"
    >
      <FcGoogle className="mr-4 h-5 w-5" /> Sign in with Google
    </Button>
  );
}
