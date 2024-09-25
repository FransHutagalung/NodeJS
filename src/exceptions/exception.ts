export class httpException extends Error {
    message: string
    errorCode : any
    statusCode : number
    error : any
    
    constructor(message: string , errorCode : any , statusCode : number , error : any) {
        super(message);
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.error = error
    }
}

export enum ErrorCode {
    NOT_FOUND = 404,
    USER_NOT_EXIST = 400,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
    INCPLICIT_VALIDATION = 422,
    INCORRECT_PASSWORD = 401,
    USER_ALREADY_EXIST = 409,
    UNAUTHORIZED = 401,
    // USER_NOT_EXIST = 400
}   