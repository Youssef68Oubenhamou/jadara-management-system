export const userController = async (req , res) => {

    try {
        
        const user = new User(req.body);

        res.status(201).json(user);

    } catch (error) {
        
        console.log(error);

    }

}