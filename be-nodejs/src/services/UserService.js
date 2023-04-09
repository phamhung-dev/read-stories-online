const User = require("./../models/User");
const { cleanProperties, emailValidator, passwordValidator } = require('./../validator/RequestValidate');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { cloudinary } = require("./../../config/CloudinaryConfig");
const generator = require('generate-password');
const transporter = require('./../../config/EmailConfig');

const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

async function login(data) {
    allowedProperties = {
        email: true,
        password: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var user = await User.findOne({ email: dataClean.email });
    if(user && user.isLocked){
        throw new Error("Your account is locked, please contact admin");
    }
    if (user && (await bcrypt.compare(dataClean.password, user.password))) {
        const token = jwt.sign(
            { id: user._id, email: user.email },
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
    if (!emailValidator(dataClean.email)) {
        throw new Error("Invalid email");
    }
    if (!passwordValidator(dataClean.password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number");
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
        { id: newUser._id, email: newUser.email },
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

async function forgotPassword(data){
    allowedProperties = {
        email: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    console.log(dataClean.email);
    if(!dataClean.email){
        throw new Error("Email is required");
    }
    var user = await User.findOne({email: dataClean.email});
    if(!user){
        throw new Error("Email not found");
    }
    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    var mailOptions = {
        from: 'readstoriesonline4tl@gmail.com',
        to: user.email,
        subject: 'New password',
        text: 'Your new password is: ' + newPassword + '. Please change your password after login.'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return {content: 'New password has been sent to your email'};
}

async function show(id){
    try{
        var user = await User.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
    catch(err){
        throw err;
    }
}

async function update(id, data){
    allowedProperties = {
        name: true,
        avatar: true,
        balance: true,
        email: true,
        password: true,
        isAdmin: true,
        isLocked: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var user = await User.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    var imageURL = user.avatar;
    try {
        user = await User.findOneAndUpdate({_id: id}, dataClean, {new: true});
        if(dataClean.avatar){
            await cloudinary.uploader.destroy(getPublicId(imageURL));
        }
        return user;
    }
    catch (err) {
        throw err;
    }
}

async function findAll(){
    try {
        return await User.find({});
    }
    catch (err) {
        throw err;
    }
}

async function showProfile(id){
    try {
        var user = await User.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        user = user.toJSON();
        delete user.isAdmin;
        return user;
    }
    catch (err) {
        throw err;
    }
}

async function updateProfile(id, data){
    allowedProperties = {
        name: true,
        avatar: true,
        password: true,
        retypePassword: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var user = await User.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    var imageURL = user.avatar;
    try {
        if(dataClean.password){
            if (!passwordValidator(dataClean.password)) {
                throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number");
            }
            if (dataClean.password !== dataClean.retypePassword) {
                throw new Error("Password and retype password not match");
            }
            dataClean.password = await bcrypt.hash(dataClean.password, 10);
        }
        user = await User.findOneAndUpdate({_id: id}, dataClean, {new: true});
        if(dataClean.avatar){
            await cloudinary.uploader.destroy(getPublicId(imageURL));
        }
        user = user.toJSON();
        delete user.isAdmin;
        return user;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { login, register, logout, forgotPassword, show, update, findAll, showProfile, updateProfile };