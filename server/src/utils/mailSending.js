import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendTheMail = (toMail, name, userId) => {
    console.log(process.env.VERIFICATION_LINK);
    transporter.sendMail(
        {
            from: process.env.SMTP_MAIL,
            to: toMail,
            subject: `Email verification`,
            html: `<h2>Hi there, ${name}</h2><br><br> <p>This is the email verification message <a href='${
                process.env.VERIFICATION_LINK
            }/${userId}-${new Date()}'>click here to verify yourself</a></p>`,
        },
        function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail send successfully");
            }
        }
    );
}

export {transporter, sendTheMail};