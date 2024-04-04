
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({path: "./.env"});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at PORT ${process.env.PORT}`)
    })
    app.on((error)=>{
        console.log("ERROR: ",error)
    })
})
.catch((error)=>{
    console.log(" MongoDB connection failed !!!:",error)
})
















// import express from 'express';

// const app = express();

// (async ()=>{
//    try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(error)=>{
//         console.log(error)
//         throw error
//     })

//     app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on PORT  ${process.env.PORT}`);
//     })

//    } catch (error) {
//     console.log("Error",error)
//    }
// })()