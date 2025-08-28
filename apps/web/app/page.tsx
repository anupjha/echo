"use client"
import { useQuery, useMutation, Authenticated, Unauthenticated } from "convex/react"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh">
          <UserButton />
          <Button onClick={() => addUser()}>Add User</Button>
          <h1>aaps/web!</h1>
          <div className="max-w-sm w-full mx auto">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-svh">
          <h1>Please sign in to view this page.</h1>
          <SignInButton>
            Sign In
          </SignInButton>
        </div>
      </Unauthenticated>
    </>
  )
}
