export function FormGroup( { children, errorMsg } ){
    return (
        <div className={`form-group ${errorMsg != null ? "error": ""}`}>
            {children}
            {errorMsg != null && <div className="error-message">{errorMsg}</div>}
        </div>
    )
}