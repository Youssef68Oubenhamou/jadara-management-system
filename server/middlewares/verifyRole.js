import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Role from "../models/roleModel.js"

dotenv.config();

export default (req , res , next) => {

    const token = req.headers.authorization.replace("Bearer " , "");

    if (!token) {

        res.status(401).json({message: "Authorization Failed"});

    }
    jwt.verify(token , process.env.JWT_SECRET , async (err, decoded) => {

        if (err) {

            return res.status(403).json({ message: 'Failed to authenticate token' });

        }

        req.userData = decoded;

        const role = await Role.findById(req.userData.role_id);

        if (role.role_name == "admin") {

            next();

        } else {

            res.status(403).json({ message: "You don't have the access to this route !" })
            res.redirect("/course/get");

        }


    });

}