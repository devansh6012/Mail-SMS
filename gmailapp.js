const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
    }
})

const mailOptions = {
    from: '"Devansh Gupta" <devansh6012@gmail.com>',
    to: "devansh.gupta@exicom.in",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hi Devansh, I am sending this mail from node js</b>", // html body
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully');
    } catch (error) {
        console.log(error);
    }
}

sendMail(transporter, mailOptions)