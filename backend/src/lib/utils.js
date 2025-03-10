import jwt from "jsonwebtoken"

// generate a jwt token and sending it to the user in the httponly cookie
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    );

    res.cookie("jwt",token, 
        {maxAge: 7 * 24 * 60 * 60 * 1000, // ml
        httpOnly: true, // once expires the user has to login again
        sameSite: "strict", 
        secure:  process.env.Node_ENV !== "development",
        });
        return token; 
};