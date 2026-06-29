import { useRef, useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ArrowUp01Icon,
    ArrowUpRight,
    AttachmentIcon,
    Camera01Icon,
    FileIcon,
    FileImageIcon,
    Link01Icon,
    MousePointerClick,
    PlusSignIcon,
    Stars,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const CHAT_MODELS = [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o mini" },
    { value: "claude-sonnet", label: "Claude Sonnet" },
    { value: "claude-haiku", label: "Claude Haiku" },
    { value: "gemini-pro", label: "Gemini Pro" },
] as const

type InputChatProps = {
    onSend: (message: string) => void
    disabled?: boolean
}

export default function InputChat({ onSend, disabled = false }: InputChatProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState("")
    const [model, setModel] = useState<(typeof CHAT_MODELS)[number]["value"]>(
        CHAT_MODELS[0].value
    )

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmed = message.trim()
        if (!trimmed || disabled) {
            return
        }

        onSend(trimmed)
        setMessage("")
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-full max-w-2xl">
            <InputGroup className="h-auto flex-col overflow-hidden rounded-4xl shadow-sm">
                <InputGroupTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    rows={3}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            e.currentTarget.form?.requestSubmit()
                        }
                    }}
                    disabled={disabled}
                />

                <InputGroupAddon
                    align="block-end"
                    className="w-full justify-between gap-2 px-2 pb-2 pt-1"
                >
                    <div className="flex min-w-0 items-center gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <InputGroupButton
                                    type="button"
                                    size="icon-sm"
                                    className="rounded-full"
                                    variant="secondary"
                                    aria-label="Add attachments and more"
                                >
                                    <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                                </InputGroupButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="min-w-52">
                                <DropdownMenuItem onSelect={() => fileInputRef.current?.click()}>
                                    <HugeiconsIcon icon={AttachmentIcon} strokeWidth={2} />
                                    Attach files
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={Link01Icon} strokeWidth={2} />
                                    Paste a link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={FileImageIcon} strokeWidth={2} />
                                    Upload image
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} />
                                    Take screenshot
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <HugeiconsIcon icon={FileIcon} strokeWidth={2} />
                                    Use template
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Select
                            value={model}
                            onValueChange={(value) =>
                                setModel(value as (typeof CHAT_MODELS)[number]["value"])
                            }
                        >
                            <SelectTrigger
                                size="sm"
                                className="text-white ring-0 border-none shadow-none h-8"
                            >
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent align="start" className="min-w-44">
                                {CHAT_MODELS.map((chatModel) => (
                                    <SelectItem key={chatModel.value} value={chatModel.value}>
                                        {chatModel.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputGroupButton
                            type="button"
                            size="sm"
                            variant="secondary"
                            aria-label="Send message"
                        >
                            <HugeiconsIcon icon={Stars} className="focus:ring-2 focus:ring-primary" strokeWidth={2} />
                            Summarize
                        </InputGroupButton>
                    </div>
                    <InputGroupButton
                        type="submit"
                        size="icon-sm"
                        variant={'secondary'}
                        aria-label="Send message"
                        className="rounded-full"
                    >
                        <HugeiconsIcon icon={ArrowUpRight} strokeWidth={2} />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </motion.form>
    )
}
