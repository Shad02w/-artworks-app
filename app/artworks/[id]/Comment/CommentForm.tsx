import { z } from "zod"
import { useState, useRef } from "react"
import { Textarea } from "@/components/TextArea"
import { Input } from "@/components/Input"

const CommentFormSchema = z.object({
    name: z.string().min(1).max(255),
    comment: z.string().min(1).max(1000)
})

interface Props {
    onSubmit: (data: { name: string; comment: string }) => void
}

export function CommentForm({ onSubmit }: Props) {
    const [error, setError] = useState<z.inferFlattenedErrors<typeof CommentFormSchema>["fieldErrors"] | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const handleSubmit = (formData: FormData) => {
        const result = CommentFormSchema.safeParse({
            name: formData.get("name") as string,
            comment: formData.get("comment") as string
        })

        if (!result.success) {
            setError(result.error.flatten().fieldErrors)
            return
        }

        onSubmit(result.data)
        setError(null)
        formRef.current?.reset()
    }

    return (
        <form action={handleSubmit} ref={formRef}>
            <div className="mb-3 flex flex-col">
                <label className="mb-1" htmlFor="name">
                    Name:
                </label>
                <Input type="text" id="name" name="name" placeholder="Your Name" />
                {error?.name && <p className="mb-1 mt-1 text-sm text-red-500">{error.name}</p>}
            </div>
            <div className="mb-3 flex flex-col">
                <label className="mb-1" htmlFor="comment">
                    Comment:
                </label>
                <Textarea id="comment" name="comment" placeholder="Share your feelings" />
                {error?.comment && <p className="mb-1 mt-1 text-sm text-red-500">{error.name}</p>}
            </div>
            <button className="rounded-md bg-black p-2 text-white lg:w-full lg:rounded-xl lg:p-3" type="submit">
                Submit
            </button>
        </form>
    )
}
