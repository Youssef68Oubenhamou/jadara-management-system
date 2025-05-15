import express from "express";
import {register,users, login } from "../controllers/userController.js"
import userProfile from "../controllers/userController.js"
import {registerValidation,loginValidation} from "../middelwares/authValidator.js"
import verifyToken from "../middelwares/authJwt.js"

export const router = express.Router();

// registre route with registre validation
router.post("/register", registerValidation,register);

// log in of user
router.post("/login", loginValidation, login);

// get user profile by using his id 
router.get("/profile/:id" ,verifyToken,userProfile);

// we use that route to get all users inf
router.get("/users", verifyToken,users);







