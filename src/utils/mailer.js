const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendContactMail = async (contact) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: "subashvel.sts@gmail.com", // update if needed
    subject: `New Contact Submission - ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #7b1fa2; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">NYRA SAREES</h2>
            <p style="margin: 0;">New Contact Form Submission</p>
          </div>

          <!-- Body -->
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hello, you have received a new enquiry:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${contact.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${contact.email}" style="color: #7b1fa2;">${contact.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${contact.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${contact.subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${contact.comments}</td>
              </tr>
            </table>

            <p style="margin-top: 20px; font-size: 14px; color: #555;">
              Regards,<br>
              <strong>NYRA Sarees</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} NYRA Sarees. All Rights Reserved.
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Contact email sent successfully (styled)");
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    throw error;
  }
};



const sendOrderMail = async (order) => {
  const currencySymbol = order.currency?.toUpperCase() === 'USD' ? '$' : '₹'; 

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: order.email,
    bcc: "subashvel.sts@gmail.com",
    subject: `🛍️ NYRA Sarees: Thank you ${order.fullName} – Your Order is Confirmed!`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 12px rgba(0,0,0,0.1);">
          
          <div style="background: #7484ec; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">NYRA SAREES</h2>
            <p style="margin: 0;">Order Confirmation</p>
          </div>

          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hi ${order.fullName || "Valued Customer"},</p>
            <p style="font-size: 14px; color: #555;">Thank you for shopping with us! Here are your order details:</p>
            <p style="font-size: 16px; color: #333;">
              Your order ID is: <strong>${order.orderId}</strong>
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr style="font-weight: bold;">
                <td style="padding: 10px; border: 1px solid #ddd;">Product</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Color</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Unit Price</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Quantity</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Total Price</td>
              </tr>
              ${order.products.map(item => `
               <tr>
                 <td style="padding: 10px; border: 1px solid #ddd;">${item.productName}</td>
                 <td style="padding: 10px; border: 1px solid #ddd;">
                 <div style="
                     width: 20px;
                     height: 20px;
                     background-color: ${item.productColor};
                     border: 1px solid #ddd;
                     border-radius: 4px;
                     display: inline-block;
                   "></div>
                 </td>
                 <td style="padding: 10px; border: 1px solid #ddd;">${currencySymbol}${item.productPrice.toFixed(2)}</td>
                 <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                 <td style="padding: 10px; border: 1px solid #ddd;">${currencySymbol}${(item.productPrice * item.quantity).toFixed(2)}</td>
               </tr>
              `).join("")}
            </table>

           <div style="margin-top: 15px; text-align: right;">
              <p style="font-size: 16px; margin: 5px 0;"><strong>Discount: - ${currencySymbol}${order.discount.toFixed(2)}</strong></p>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Total: ${currencySymbol}${order.total.toFixed(2)}</strong></p>
            </div>

            <p style="margin-top: 20px; font-size: 14px; color: #555;">
              We’ll notify you once your order is shipped.<br>
              Regards,<br>
              <strong>NYRA Sarees</strong>
            </p>
          </div>

          <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} NYRA Sarees. All Rights Reserved.
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Order email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send order email:", error);
    throw error;
  }
};

module.exports = { sendContactMail, sendOrderMail };
