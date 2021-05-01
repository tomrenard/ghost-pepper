const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please blablablabla.</p>
    <ul>
      ${order.map(item => {
        return (
          `<li>
          <img src="${item.thumbnail}" alt="${item.name}">
          ${item.size} ${item.name} ${item.price}
          </li>`
        );
      })}
    </ul>
    <p>Your total is ${total}</p>
  </div>`;
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

async function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  if(body.syrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'wow mamen look like a botitotati' }),
    }
  }

  const requiredFields = ['email', 'email', 'order'];
  for (const field of requiredFields) {
    if(!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `oops you are missing the ${field} field`}),
      }
    }
  }

  if(!body.order.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `why order nothing mamen`}),
      }
    }

  const info = await transporter.sendMail({
    from: "Slick's Slices mamen <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "suceesss baby" }),
  };
}
