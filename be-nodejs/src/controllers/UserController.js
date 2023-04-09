const userService = require('./../services/UserService');
const { cloudinary } = require("./../../config/CloudinaryConfig");

const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

async function login(req, res) {
    try {
        const user = await userService.login(req.body);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function register(req, res) {
    try {
        const user = await userService.register(req.body);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function logout(req, res) {
    try {
        await userService.logout(req.user);
        res.status(200).json({ message: 'SUCCESS', data: { content: 'Logout successfully' } });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function forgotPassword(req, res) {
    try {
        const response = await userService.forgotPassword(req.body);
        res.status(200).json({ message: 'SUCCESS', data: response });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function show(req, res) {
    try {
        const user = await userService.show(req.params.id);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function update(req, res) {
    try {
        if (req.file) {
            req.body.avatar = req.file.path;
        }
        const user = await userService.update(req.params.id, req.body);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        if (req.file) {
            await cloudinary.uploader.destroy(getPublicId(req.file.path));
        }
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function findAll(req, res) {
    try {
        const users = await userService.findAll();
        res.status(200).json({ message: 'SUCCESS', data: users });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function showProfile(req, res) {
    try {
        const user = await userService.showProfile(req.params.id);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function updateProfile(req, res) {
    try {
        if (req.file) {
            req.body.avatar = req.file.path;
        }
        const user = await userService.updateProfile(req.params.id, req.body);
        res.status(200).json({ message: 'SUCCESS', data: user });
    }
    catch (err) {
        if (req.file) {
            await cloudinary.uploader.destroy(getPublicId(req.file.path));
        }
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

function index(req, res) {
    res.render('web/index');
}

module.exports = { login, register, logout, forgotPassword, show, update, findAll, showProfile, updateProfile };