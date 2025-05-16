import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req , res , next) => {

    console.log("hello bro for verifyToken");

    try {

        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        req.userData = decoded;
        console.log(req.userData);
        next();

    } catch (err) {

        return res.status(401).json({

            message: "Authentication Failed"

        })

    }

}