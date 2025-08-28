"use client"
import { useQuery, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button onClick={() => addUser()}>Add User</Button>
      <h1>aaps/widget!</h1>
      <div className="max-w-sm w-full mx auto">
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  )
}
