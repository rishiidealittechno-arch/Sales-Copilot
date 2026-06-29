import { Link } from "react-router-dom"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { EmailTemplatesTable } from "./components"

export default function TemplatesPage() {
  return (
    <div className="space-y-4 px-8 py-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button asChild>
          <Link to="/templates/new">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={1.5} />
            Create template
          </Link>
        </Button>
      </div>
      <EmailTemplatesTable />
    </div>
  )
}
