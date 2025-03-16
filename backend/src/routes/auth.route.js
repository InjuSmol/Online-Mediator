import express from "express"
import {checkAuth, login, signup, logout, updateProfile} from "../controllers/auth.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute, updateProfile)
router.get("/check", protectRoute, checkAuth) // call this function every time we refresh our application to check if the user is authenticated to know to what page to take the user

export default router; 