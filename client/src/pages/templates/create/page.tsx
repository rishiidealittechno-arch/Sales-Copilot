import { useCallback, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import EmailEditor, { type EditorRef } from "react-email-editor"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateTemplatePage() {
  const navigate = useNavigate()
  const emailEditorRef = useRef<EditorRef>(null)
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [editorReady, setEditorReady] = useState(false)

  const onEditorReady = useCallback(() => {
    setEditorReady(true)
  }, [])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const editor = emailEditorRef.current?.editor
    if (!editor) {
      navigate("/templates")
      return
    }
    editor.exportHtml(() => {
      navigate("/templates")
    })
  }

  return (
    <div className="px-8 pb-8">
      <form onSubmit={handleSave} className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Template name</p>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Welcome email"
            required
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Email subject</p>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject line recipients will see"
            required
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Email design</p>
          <div className="bg-background overflow-hidden rounded-md border">
            <EmailEditor
              ref={emailEditorRef}
              onReady={onEditorReady}
              minHeight={800}
              options={{
                displayMode: "email",
                appearance: {
                  theme: "modern_light",
                },
              }}
            />
          </div>
          {!editorReady ? (
            <p className="text-muted-foreground text-xs">Loading editor…</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!editorReady}>
            Save template
          </Button>
          <Button variant="outline" asChild>
            <Link to="/templates">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
