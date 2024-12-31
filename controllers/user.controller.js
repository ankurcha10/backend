const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const userServices = require('../services/user.service');


module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        firstname : fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
    });
    await user.save(); // Ensure the user is saved to the database
    const token = await user.generateAuthToken();
 
    res.status(201).json({ user, token });
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user  = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });

}