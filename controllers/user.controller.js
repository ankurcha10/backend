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
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
}