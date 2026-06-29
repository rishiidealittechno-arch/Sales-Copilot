import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown01Icon, CheckListIcon, FilePlus, UserPlus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ManuallyAddUserDialog } from "./manually-add-user-dialog"

export function ImportUsersDropdown() {
  const [manualAddOpen, setManualAddOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" className="gap-2 rounded-2xl">
            Import / Update Users
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="size-4 opacity-70"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuItem>
            <HugeiconsIcon strokeWidth={2} icon={FilePlus} />
            Import Users
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setManualAddOpen(true)}>
            <HugeiconsIcon strokeWidth={2} icon={UserPlus} />
            Manually add users
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <HugeiconsIcon strokeWidth={2} icon={CheckListIcon} />
            Validate email address
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ManuallyAddUserDialog
        open={manualAddOpen}
        onOpenChange={setManualAddOpen}
      />
    </>
  )
}
