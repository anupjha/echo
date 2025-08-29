"use client"
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view";


export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>)
};