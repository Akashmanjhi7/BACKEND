import { Router } from "express";
import registerUser from "../controllers/user.conroller.js";

const router  = Router()

router.route("/register").get(registerUser)

export default router