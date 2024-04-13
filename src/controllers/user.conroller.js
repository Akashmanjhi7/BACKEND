import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req,res)=>{
   return res.status(200).json({
        message : "ok",
        data : {
            name : "John",
            age : 20
        }
    })
})

export default  registerUser;