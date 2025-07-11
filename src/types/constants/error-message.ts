
export const status_code: { [key: number]: string } = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    405: "Method not allowed",
    409: "Conflict request",
    500: "Internal server error"
}

export const ErrorMessages ={
    body_validation_error:"body validation error",
    email_already_exist:"user already exist",
    user_not_found:"user not found",
    incorrect_password:"incorrect password"
}   
