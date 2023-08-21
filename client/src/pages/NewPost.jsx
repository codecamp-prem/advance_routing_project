import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { getUsers } from "../api/users"
import { createPost } from "../api/posts"
import { PostForm, postFormValidation } from "../components/PostForm"

function NewPost(){
    const { state } = useNavigation()
    const isSubmitting = state === "submitting"

    const authors = useLoaderData()
    const errors = useActionData()

    return (
        <>
        <h1 className="page-title">New Post</h1>
        <PostForm authors={authors} isSubmitting={isSubmitting} errors={errors}/>
        </>
    )
}

async function action({ request }){
    const formData = await request.formData()
    const title = formData.get("title")
    const body = formData.get("body")
    const userId = formData.get("userId")

    // check error befor creating post
    const errors = postFormValidation({ title, body, userId })
    if(Object.keys(errors).length > 0){
        return errors
    }

    const post = await createPost({title, body, userId}, { signal: request.signal })
    return redirect(`/posts/${post.id}`)
}

function loader({ request: { signal } }){
    return getUsers({ signal })
}

export const newPostRoute = {
    loader,
    action,
    element: <NewPost />
}