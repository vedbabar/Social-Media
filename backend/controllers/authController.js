import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, fullName, password, email } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already in use" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already in use" });
        }
        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            fullName,
            password: hashedPassword,
            email,
        });
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else{
            res.status(400).json({ error: "Invalid user data" });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }

};

export const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect= await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        }); 

    }catch{
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }catch(error) {
        console.log("error in getMe", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};