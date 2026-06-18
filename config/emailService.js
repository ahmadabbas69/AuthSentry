const nodemailer = require("nodemailer");
const ejs = require("ejs"); // Import EJS compiler
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        // 1. Point to your clean template file path
        const templatePath = path.join(__dirname, "../views/emailTemplate.ejs");

        // 2. Compile the EJS template and feed it your user data values
        const htmlRendered = await ejs.renderFile(templatePath, { name: userName });

        const mailOptions = {
            from: `"JWS Hub Security" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "🚀 Registration Complete - Verified System Access",
            html: htmlRendered, //Injecting the rendered dynamic template
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 EJS Template email successfully dispatched to ${userEmail}`);
    } catch (err) {
        console.error("❌ EJS/Nodemailer engine error:", err.message);
    }
};

module.exports = sendWelcomeEmail;