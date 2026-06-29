import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { authClient, useSession } from "@/lib/auth"

function splitName(name: string | undefined) {
  if (!name?.trim()) return { firstName: "", lastName: "" }
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0], lastName: "" }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

function FieldHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium">{title}</h2>
      {description ? (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default function ProfileSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasPasswordAccount, setHasPasswordAccount] = useState(false)
  const [draftPhotoUrl, setDraftPhotoUrl] = useState("")
  const [draftEmail, setDraftEmail] = useState("")

  useEffect(() => {
    if (!user) return
    const { firstName: nextFirst, lastName: nextLast } = splitName(user.name)
    setFirstName(nextFirst)
    setLastName(nextLast)
    setEmail(user.email ?? "")
    setPhotoUrl(user.image ?? "")
  }, [user])

  const initials = [firstName, lastName]
    .map((p) => p.trim()[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const openPhotoDialog = useCallback(() => {
    setDraftPhotoUrl(photoUrl)
    setPhotoDialogOpen(true)
  }, [photoUrl])

  const savePhotoUrl = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const next = draftPhotoUrl.trim()
      if (next) setPhotoUrl(next)
      setPhotoDialogOpen(false)
    },
    [draftPhotoUrl]
  )

  const removePhoto = useCallback(() => {
    setPhotoUrl("")
  }, [])

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      setPhotoUrl(url)
      e.target.value = ""
    },
    []
  )

  const saveEmail = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setEmail(draftEmail.trim())
      setEmailDialogOpen(false)
    },
    [draftEmail]
  )
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    const result = await authClient.signOut()
    if (result.error) return
    navigate("/login")
  }, [navigate])

  const openDeleteDialog = useCallback(async () => {
    setDeleteError(null)
    setDeletePassword("")

    const accounts = await authClient.listAccounts()
    const usesPassword = accounts.data?.some(
      (account) => account.providerId === "credential"
    )
    setHasPasswordAccount(Boolean(usesPassword))
    setDeleteDialogOpen(true)
  }, [])

  const handleDeleteAccount = useCallback(async () => {
    setDeleteError(null)
    setIsDeleting(true)

    try {
      const result = hasPasswordAccount
        ? await authClient.deleteUser({
            password: deletePassword,
            callbackURL: `${window.location.origin}/login`,
          })
        : await authClient.deleteUser({
            callbackURL: `${window.location.origin}/login`,
          })

      if (result.error) {
        setDeleteError(result.error.message ?? "Failed to delete account")
        return
      }

      await authClient.signOut()
      navigate("/login")
    } catch {
      setDeleteError("Something went wrong. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }, [deletePassword, hasPasswordAccount, navigate])

  const closeDeleteDialog = useCallback((open: boolean) => {
    setDeleteDialogOpen(open)
    if (!open) {
      setDeletePassword("")
      setDeleteError(null)
    }
  }, [])

  if (isPending) {
    return (
      <div className="mx-0 max-w-xl space-y-0 p-4 py-8">
        <p className="text-muted-foreground text-sm">Loading profile…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-0 max-w-xl space-y-0 p-4 py-8">
        <p className="text-muted-foreground text-sm">No signed-in user found.</p>
      </div>
    )
  }

  return (
    <div className="mx-0 max-w-xl space-y-0 p-4 py-8">
      <div className="space-y-10">
        <section className="space-y-4">
          <FieldHeading title="Picture" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-20 shrink-0 rounded-md after:rounded-md">
              {photoUrl ? (
                <AvatarImage
                  src={photoUrl}
                  alt=""
                  className="rounded-md object-cover"
                />
              ) : null}
              <AvatarFallback className="rounded-md text-lg font-medium">
                {initials || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  className="sr-only"
                  onChange={onFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={removePhoto}
                  disabled={!photoUrl}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-muted-foreground h-auto px-2"
                  onClick={openPhotoDialog}
                >
                  Paste URL
                </Button>
              </div>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                We support your square PNGs, JPGs and GIFs under 10MB.
              </p>
            </div>
          </div>
        </section>


        <section className="space-y-4">
          <FieldHeading
            title="Name"
            description="Your name as it will be displayed"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="profile-first-name" className="text-sm font-medium">
                First name
              </label>
              <Input
                id="profile-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="profile-last-name" className="text-sm font-medium">
                Last name
              </label>
              <Input
                id="profile-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
        </section>


        <section className="space-y-4">
          <FieldHeading
            title="Email"
            description="The email associated to your account"
          />
            <Input
              readOnly
              value={email}
              className="cursor-default px-3 py-2"
              aria-readonly
            />
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Set Password"
            description="Receive an email containing password set link"
          />
          <Button type="button" variant="outline" size="sm">
            Set password
          </Button>
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Danger zone"
            description="Delete account and all the associated data"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-destructive/50 text-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={openDeleteDialog}
          >
            Delete account
          </Button>
        </section>
        <section className="space-y-4">
          <FieldHeading
            title="Logout"
            description="Logout of your account"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-destructive/50 text-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </section>
      </div>

      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={savePhotoUrl}>
            <DialogHeader>
              <DialogTitle>Profile picture URL</DialogTitle>
              <DialogDescription>
                Paste a direct link to an image. For file uploads, use Upload
                on the main form.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <label htmlFor="profile-photo-url" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="profile-photo-url"
                value={draftPhotoUrl}
                onChange={(e) => setDraftPhotoUrl(e.target.value)}
                placeholder="https://"
                type="url"
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPhotoDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={saveEmail}>
            <DialogHeader>
              <DialogTitle>Edit email</DialogTitle>
              <DialogDescription>
                This address is used for sign-in and important notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <label htmlFor="profile-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="profile-email"
                type="email"
                value={draftEmail}
                onChange={(e) => setDraftEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEmailDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={closeDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              This will permanently remove your account and associated data.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {hasPasswordAccount ? (
            <div className="grid gap-2 py-2">
              <label htmlFor="delete-password" className="text-sm font-medium">
                Confirm your password
              </label>
              <Input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(event) => setDeletePassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>
          ) : (
            <p className="text-muted-foreground py-2 text-sm">
              Your account will be deleted, or you may receive a confirmation
              email if additional verification is required.
            </p>
          )}

          {deleteError ? (
            <p className="text-sm text-red-500">{deleteError}</p>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => closeDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={
                isDeleting || (hasPasswordAccount && !deletePassword.trim())
              }
              onClick={handleDeleteAccount}
            >
              {isDeleting ? "Deleting..." : "Delete account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
