const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'readstoriesonline4tl@gmail.com',
        pass: 'vopijchyrsatonmc'
    }
});

module.exports = transporter;