import { httpException } from "./exception";

export class unProcessable extends httpException {

    constructor(error : any , message: string  , errorCode: number) {
        super(message,errorCode,422,error);
    }
}