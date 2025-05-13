import User from "../models/userModel.js";

export const createUser = async (req , res) => {

    try {
        
        const user = new User(req.body);

        res.status(201).json(user);

    } catch (error) {
        
        console.log(error);

    }

}

export const getUser = async (req , res) => {

    const { id: _id } = req.params;

    const newPost = req.body;

    try {
        
        const post = await User.updateOne(_id , newPost);

        res.status(201).json(post);

    } catch (error) {
        
        console.log(error);

    }

}