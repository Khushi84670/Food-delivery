import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect password' });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }

}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

// register user
const registerUser = async (req, res) => {
    const{name,password,email}=req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: 'User already exists' });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email' });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const slat = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, slat);
        const newUser = new userModel({ name, email, password: hashPassword });

       const user= await newUser.save()
       const token = createToken(user._id);
       res.json({ success: true,token });

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR"});
} 
}
export { loginUser, registerUser };