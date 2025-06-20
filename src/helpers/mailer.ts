import nodemailer from "nodemailer";
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    // Generate a hashed token
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    // Update token fields in DB
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    // Setup email transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER || "0d8607e865831a", // move to .env
        pass: process.env.MAILTRAP_PASS || "91703ff3ac3a5d", // move to .env
      },
    });

    // Email content
    const mailOptions = {
      from: 'anish@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.<br><br>
      ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${hashToken}</p>`,
    };

    // Send email
    const emailResponse = await transport.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
