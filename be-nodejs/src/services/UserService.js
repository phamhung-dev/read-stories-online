const User = require("./../models/User");
const { cleanProperties } = require('./../validator/RequestValidate');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

async function login(data) {
    allowedProperties = {
        email: true,
        password: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var user = await User.findOne({ email: dataClean.email });
    if (user && (await bcrypt.compare(dataClean.password, user.password))) {
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "30d",
            }
        );
        user.token = token;
        return await user.save();
    }
    throw new Error("Invalid email or password");
}

async function register(data) {
    allowedProperties = {
        name: true,
        email: true,
        password: true,
        retypePassword: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    if (!(dataClean.name && dataClean.email && dataClean.password && dataClean.retypePassword)) {
        throw new Error("Name, email, password and retype password are required");
    }
    const user = await User.findOne({ email: dataClean.email });
    if (user) {
        throw new Error("Email already exists. Please try another email or login");
    }
    if (dataClean.password !== dataClean.retypePassword) {
        throw new Error("Password and retype password not match");
    }
    var newUser = await User.create({
        name: dataClean.name,
        email: dataClean.email,
        password: await bcrypt.hash(dataClean.password, 10),
    });
    const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "30d",
        }
    );
    newUser.token = token; 
    return await newUser.save();
}

async function logout(data) {
    allowedProperties = {
        id: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var user = await User.findOne({id: dataClean.id});
    if (user) {
        user.token = null;
        return await user.save();
    }
    throw new Error("User not found");
}
    

module.exports = { login, register, logout };