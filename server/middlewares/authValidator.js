import validator from "validatorjs";

export const registerValidation = async (req , res , next) => {

    const validateRule = {

        "username":"required|string|min:3",
        "email":"required|email",
        "password":"required|min:6",

    }

    await validator(req.body , validateRule , {} , (err , status) => {

        if (!status) {

            res.status(412).send({ message: "validation Failed" });

        } else {

            next();

        }

    }).catch((err) => {

        console.log(err);

    })

}

export const loginValidation = async (req , res , next) => {

    const validateRule = {

        "email":"required|email",
        "password":"required|min:6"

    };

    await Validator(req.body , validateRule , {} , (err , status) => {

        if (!status) {

            res.status(412).send({ message: "Validation Failed" })

        } else {

            next();

        }

    }).catch((err) => {

        console.log(err);

    })

}