const asyncHandler = (requestHandeler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandeler)

    }
}