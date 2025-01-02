import nodemailer from "nodemailer";

export const sendOrderMail = async (req, res) => {
  const order = req.body;
  console.log("order", order);

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
      to: order?.email,
      subject: "Order Details",
      html: `
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been received and is being processed. Below are the details:</p>
          
          <h3>Order Details</h3>
          <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${order?.cart
                ?.map(
                  (item) => `
                <tr>
                  <td><img src="${item?.image}" alt="${
                    item?.name
                  }" width="100" /></td>
                  <td>${item?.name}</td>
                  <td>${item?.quantity}</td>
                  <td>${(item?.price * item?.quantity).toLocaleString(
                    "en-IN"
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
      
          <h3>Order Summary</h3>
          <p><strong>Total Quantity:</strong> ${order?.totalAmount?.toLocaleString(
            "en-IN"
          )}</p>

          <h2>Shipping Address</h2>
          <h4 style="margin:0">Name : <span style="font-weight:500">${order?.firstName} ${order?.lastName}</span></h4>
          <h4 style="margin:0">Address : <span style="font-weight:500">${order?.address}</span></h4>
          <h4 style="margin:0">Email : <span style="font-weight:500">${order?.email}</span></h4>
          <h4 style="margin:0">Phone : <span style="font-weight:500">${order?.phone}</span></h4>
          <h4 style="margin:0">Pincode : <span style="font-weight:500">${order?.pincode}</span></h4>
          <h4 style="margin:0">City : <span style="font-weight:500">${order?.city}</span></h4>
          <h4 style="margin:0">State : <span style="font-weight:500">${order?.state}</span></h4>
        `,
    };
    const mailOptions2 = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "New Order",
        html: `
            <h1>You got new order from ${order?.email}</h1>

            <p>Your order has been received and is being processed. Below are the details:</p>
            
            <h3>Order Details</h3>
            <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${order?.cart
                  ?.map(
                    (item) => `
                  <tr>
                    <td><img src="${item?.image}" alt="${
                      item?.name
                    }" width="100" /></td>
                    <td>${item?.name}</td>
                    <td>${item?.quantity}</td>
                    <td>${(item?.price * item?.quantity).toLocaleString(
                      "en-IN"
                    )}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
        
            <h3>Order Summary</h3>
            <p><strong>Total Quantity:</strong> ${order?.totalAmount?.toLocaleString(
              "en-IN"
            )}</p>
  
            <h2>Shipping Address</h2>
            <h4 style="margin:0">Name : <span style="font-weight:500">${order?.firstName} ${order?.lastName}</span></h4>
            <h4 style="margin:0">Address : <span style="font-weight:500">${order?.address}</span></h4>
            <h4 style="margin:0">Email : <span style="font-weight:500">${order?.email}</span></h4>
            <h4 style="margin:0">Phone : <span style="font-weight:500">${order?.phone}</span></h4>
            <h4 style="margin:0">Pincode : <span style="font-weight:500">${order?.pincode}</span></h4>
            <h4 style="margin:0">City : <span style="font-weight:500">${order?.city}</span></h4>
            <h4 style="margin:0">State : <span style="font-weight:500">${order?.state}</span></h4>
          `,
      };

    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(mailOptions2);
    res
      .status(200)
      .json({ message: "Order Email sent successfully...!", info, info2 });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
};
