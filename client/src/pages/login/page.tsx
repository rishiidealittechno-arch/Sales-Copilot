import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { LoginForm } from "@/components/login-form"
import { useSession } from "@/lib/auth"

export default function LoginPage() {
  const navigate = useNavigate()
  const { data: session, isPending } = useSession()
  console.log(session)

  useEffect(() => {
    if (!isPending && session) {
      navigate("/", { replace: true })
    }
  }, [session, isPending, navigate])

  if (isPending || session) {
    return null
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-5">
      <div className="col-span-3 bg-muted"></div>
      <div className="col-span-2 flex flex-col gap-4 p-6 md:p-10">
      <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
