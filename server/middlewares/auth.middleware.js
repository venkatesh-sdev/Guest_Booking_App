import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {

        // Getting Authorization Token
        let token = req.header("Authorization");

        // Checking Token is Present or Not 
        if (!token)
            return res.status(403).json({ message: "Status Denied" });

        // Checking and Spliting Data
        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length);

        // JWT Verfication
        const verified = jwt.verify(token, process.env.HASH_KEY);

        // Setting a Value to the User
        req.user = verified;

        // Send to next Controller
        next();

    } catch (error) {
        res.status(500).json(error)
    }
}