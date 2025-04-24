import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "Unauthorized"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "user not found!"});
        }
        req.user = user;
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
}