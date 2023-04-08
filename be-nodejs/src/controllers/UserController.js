const userService = require('./../services/UserService');

async function login(req, res) {
    try {
        const user = await userService.login(req.body);
        res.status(200).json({message: 'SUCCESS', data: user});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function register(req, res) {
    try {
        const user = await userService.register(req.body);
        res.status(200).json({message: 'SUCCESS', data: user});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function logout(req, res) {
    try {
        await userService.logout(req.user);
        res.status(200).json({message: 'SUCCESS', data: {content: 'Logout successfully'}});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { login, register, logout };