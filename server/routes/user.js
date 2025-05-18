import express from "express";
import {register,users, login , userProfile , updateUser, deleteUser, logout } from "../controllers/userController.js"
import {registerValidation,loginValidation} from "../middlewares/authValidator.js"
import verifyRole from "../middlewares/verifyRole.js"
import verifyToken from "../middlewares/authJwt.js"

const router = express.Router();

// registre route with registre validation
router.post("/register", registerValidation,register);

// log in of user
router.post("/login", loginValidation, login);

// get user profile by using his id 
router.get("/profile/:id" ,verifyToken,userProfile);

// we use that route to get all users inf
router.get("/users", verifyToken,users);

// adding a middlewares for verifying role
router.put("/usr/update/:id" ,  verifyRole,updateUser)

router.delete("/usr/delete/:id" , verifyRole, deleteUser)

// log out router
router.post('/logout', verifyToken,logout)


export default router;
