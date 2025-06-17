const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const createEmailHtml = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mensaje de Contacto</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 0 0 5px 5px;
        }
        .message {
          background-color: white;
          padding: 15px;
          border-left: 4px solid #007bff;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>¡Hola ${name}!</h1>
      </div>
      <div class="content">
        <p>Gracias por contactarnos. Tu cuenta se ha creado con éxito, esperamos que disfrutes de Loot&Rate.</p>
      </div>
      <div class="footer">
        <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        <p>&copy; ${new Date().getFullYear()} Loot&Rate. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;
};

const sendEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
  });
  
  const mailOptions = {
    from: `"Loot&Rate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Hola ${name}, hemos recibido tu mensaje`,
    html: createEmailHtml(name),
    text: `Hola ${name},\n\nGracias por contactarnos.Nos pondremos en contacto contigo pronto.\n\nSaludos,\nLoot&Rate.`,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return { success: false, error: 'Error al enviar el correo.' };
  }
};

module.exports = {
  sendEmail
}; 