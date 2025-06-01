import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import redis from "redis";
import Role from "../models/roleModel.js"

export const register = asyncHandler(async (req , res) => {

    const { username , email , password , group } = req.body;

    const verifyEmail = await User.findOne({ email: email });

    try {
        
        if (verifyEmail) {

            return res.status(403).json({ message: "Email already exist !" });

        } else {

            bcrypt.hash(req.body.password , 10)
                .then((hash) => {

                    const user = new User({

                        username: username,
                        email: email,
                        password: hash,
                        group: group,

                    })

                    user.save()
                        .then((response) => {

                            return res.status(201).json({

                                message: "User successfuly created !",
                                result: response

                            })

                        })
                        .catch((err) => {

                            res.status(500).json({ error: err });

                        })

                });

        }

    } catch (error) {
        
        return res.status(412).send({

            message: error.message

        })

    }

});

export const login = asyncHandler( async (req , res) => {

    const { email , password } = req.body;
    
    let getUser;

    User.findOne({

        email: email

    })
        .then((user) => {

            if (!user) {

                res.status(401).json({

                    message: "Authentication Failed !"

                })

            }

            getUser = user;

            return bcrypt.compare(password, user.password);

        })
        .then(async (response) => {

            if (!response) {

                res.status(412).json({

                    message: "Authentication Failed !"

                })

            } else {

                let jwtToken = jwt.sign({

                    email: getUser.email,
                    password: getUser.password

                } , process.env.JWT_SECRET , {

                    expiresIn: "1h"

                })

                res.cookie("token" , jwtToken , {

                    httpOnly: true

                })

                const role = await Role.findById(getUser.role_id);

                return res.status(200).json({accessToken: jwtToken , userId: getUser._id , roleName: role.role_name , group: getUser.group })

            }

        })
        .catch((err) => {

            return res.status(401).json({

                message: err.message ,
                success: false

            })

        })

});

export const logout = asyncHandler( async(req, res , next) => {
    
    req.headers.authorization = null;

    res.clearCookie("token");

    res.status(200).json({

        success:true,
        message: "User Loged Out Successfuly !",
        data:{}

    });

})

export const userProfile = asyncHandler( async(req , res , next) => {

    const { id:_id } = req.params;

    try {
        
        const verifyUser = await User.findOne({_id: _id});

        if (!verifyUser) {

            res.status(403).json({

                message: "User not found !",
                success: false

            })

        } else {

            res.status(201).json({

                message: `user: ${verifyUser.username}`,
                success: true

            })

        }

    } catch (error) {

        res.status(401).json({

            success: false,
            message: error.message

        })

    }

})

export const users = asyncHandler( async(req , res) => {

    try {
        
        const users = await User.find();

        console.log(users);

        res.status(200).json({

            data: users,
            message: "Found users successfuly !",
            success: true

        })

    } catch (error) {

        res.status(401).json({

            message: error.message,
            success: false

        })

    }

})

export const deleteUser = async (req , res) => {

    const { id: _id } = req.params.id;

    try {

        const deletedUser = await User.deleteOne(_id);
        console.log(deletedUser);
        res.status(201).json({ message: "User Has been deleted successfuly !" });
        
    } catch (error) {
        
        throw new Error(error);

    }

}

export const updateUser = async (req , res) => {

    const { id: _id } = req.params;

    let newPost = req.body;

    newPost.password = await bcrypt.hash(req.body.password , 10);

    try {
        
        const post = await User.updateOne({_id: new mongoose.Types.ObjectId(_id)} , newPost);

        res.status(201).json(post);

    } catch (error) {
        
        console.log(error);

    }

}