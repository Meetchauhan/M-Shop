import nodemailer from "nodemailer";

export const registrationMail = async (req, res) => {
  const data = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "GMAIL",
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
      subject: "New User Registered",
      html: `
            <h2>You got new user</h2>

            <h3>${data?.firstName} ${data?.lastName}'s Information</h3>
            <h4 style="margin:0">Name : <span style="font-weight:500">${data?.firstName} ${data?.lastName}</span></h4>
            <h4 style="margin:0">Email : <span style="font-weight:500">${data?.email}</span></h4>
            <h4 style="margin:0">Password : <span style="font-weight:500">${data?.password}</span></h4>

          `,
    };
    const mailOptions2 = {
      from: process.env.EMAIL,
      to: data?.email,
      subject: "Congratulations",
      html: `
              <h2>Your registration in M-SHOP is successfully done.</h2>
            `,
    };
    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(mailOptions2);
    res.status(200).json({
      message: "Registration Email sent successfully...!",
      info,
      info2,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
};
