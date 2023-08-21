import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { getUsers } from "../api/users"
import { PostForm, postFormValidation } from "../components/PostForm"
import { editPost, getPost } from "../api/posts"

function EditPost(){
    const { state } = useNavigation()
    const isSubmitting = state === "submitting"

    const { authors, post } = useLoaderData()
    const errors = useActionData()

    return (
        <>
        <h1 className="page-title">Edit Post</h1>
        <PostForm authors={authors} isSubmitting={isSubmitting} defaultValues={post} errors={errors} />
        </>
    )
}

async function loader({ request: { signal }, params: {postId} }){
    const post = getPost( postId, {signal} )
    const authors = getUsers({ signal })
    return {
        authors: await authors,
        post: await post
    }
}

async function action({ request, params: {postId} }){
    const formData = await request.formData()
    const title = formData.get("title")
    const body = formData.get("body")
    const userId = formData.get("userId")

    // check error befor editing post
    const errors = postFormValidation({ title, body, userId })
    if(Object.keys(errors).length > 0){
        return errors
    }

    const post = await editPost(
        postId,
        {title, body, userId}, 
        { signal: request.signal }
    )
    return redirect(`/posts/${post.id}`)
}

export const editPostRoute = {
    loader,
    action,
    element: <EditPost />
}