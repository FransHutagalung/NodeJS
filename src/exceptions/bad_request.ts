import { httpException } from "./exception";

export class badRequest extends httpException{
    // statusCode: number;
    // errorCode : any;
    // message : string;
    // error : any;
    constructor(message : string , errorCode : any , statusCode : number , error : any){
        super(message , errorCode , statusCode , error)
        // this.message = message
        // this.errorCode = errorCode
        // this.statusCode = statusCode
        // this.error = error
    }
}