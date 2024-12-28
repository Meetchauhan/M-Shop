import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: process.env.GMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAILPASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Enquery",
      text: "Test",
      html: `<p style="font-size:17px">This is to inform you that we have received an inquiry from <strong>${email}</strong></p>`,
    };
    const mailOptions2 = {
      from: process.env.EMAIL,
      to: email,
      subject: "Enquery",
      text: "Test",
      html: `<h3 style="font-size:22px">Thanks for Enquery</h3>
      <p style="font-size:18px">We will get back to you soon</p>
      <p style="font-size:15px; margin-bottom:0px">Regards</p>
      <b style="font-size:15px">M-Shop<b>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(mailOptions2);

    console.log("Email sent: ", info.response);
    res.status(200).json({ message: "Email sent successfully...!", info, info2 });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};
