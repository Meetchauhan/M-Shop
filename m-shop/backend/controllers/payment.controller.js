export const createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const apiKey = process.env.PAYMENT_ID;
  const apiSecret = process.env.PAYMENT_SECRET;

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
  };

  const body = {
    amount: amount,
    currency: currency,
    receipt: receipt,
  };

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
