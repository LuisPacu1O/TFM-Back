const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Las credenciales no son válidas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Las credenciales no son válidas');
    }

    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
}

async function registerUser(email, password, name, role) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, role });
    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id, role: newUser.role, name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
}

module.exports = { loginUser, registerUser };
