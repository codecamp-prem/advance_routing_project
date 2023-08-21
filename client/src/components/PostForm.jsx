import { Form, Link } from "react-router-dom"
import { FormGroup } from "./FormGroup"

export function PostForm( { authors, isSubmitting, defaultValues={}, errors={} } ){

    return (
        <>
        <Form method="post" className="form">
        <div className="form-row">
            <FormGroup errorMsg={errors.title}>
                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                name="title" 
                id="title" 
                defaultValue={defaultValues.title}
                />
            </FormGroup>
            <FormGroup errorMsg={errors.userId}>
                <label htmlFor="userId">Author</label>
                <select name="userId" id="userId" defaultValue={defaultValues.userId}>
                    {authors.map(user => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })}
                </select>
            </FormGroup>
        </div>
        <div className="form-row">
            <FormGroup errorMsg={errors.body}>
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" defaultValue={defaultValues.body}></textarea>
            </FormGroup>
        </div>
        <div className="form-row form-btn-row">
            <Link className="btn btn-outline" to="..">Cancel</Link>
            <button disabled={isSubmitting} className="btn">{isSubmitting ? "Saving" : "Save"}</button>
        </div>
        </Form>
        </>
    )

}

export function postFormValidation({title, body, userId}){
    const errors = []

    if(title.trim() === ""){
        errors.title = "Post Title is Required"
    }
    if(body.trim() === ""){
        errors.body = "Post Body/content is Required"
    }
    if(userId.trim() === ""){
        errors.userId = "Selct Author/User. Required"
    }

    return errors
}