"use client"

import { useState } from "react"
import { CommentForm } from "./CommentForm"

type Comment = {
    name: string
    comment: string
}
const dummyComment: Comment[] = [
    {
        name: "John Doe",
        comment: "This is a great artwork"
    },
    {
        name: "Jane Doe",
        comment: "I love it"
    }
]

export function Comment() {
    const [comments, setComments] = useState<Comment[]>(dummyComment)
    return (
        <div className="mt-3">
            <h2 className="mb-2 flex-col text-xl font-medium">Comments({dummyComment.length})</h2>
            <div className="mb-12">
                {comments.map((comment, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-lg font-semibold">{comment.name}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
            <hr className="my-10 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
            <CommentForm onSubmit={comment => setComments(_ => [..._, comment])} />
        </div>
    )
}
