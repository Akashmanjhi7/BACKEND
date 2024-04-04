class ApiError extends  Error {
    constructor (
        statusCode,
        messaage= "Somthing Went  wrong" ,
        errors = [],
        stack =""
    ){
        super(message);
        this.statusCode = statusCode
        this.data = null
        this.message=messaage
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }

        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export default ApiError