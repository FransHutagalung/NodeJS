import { httpException } from "./exception";

export class notFound extends httpException{

    constructor(message: string , errorCode : any , statusCode : number , error : any){ 
        super(message , errorCode , statusCode , error)
    }
}