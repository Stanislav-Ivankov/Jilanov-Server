const nodemailer = require('nodemailer');
const fs = require('fs');
let contactTemplate = null;
let orderTemplate = null;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreplyjilanov@gmail.com',
    pass: 'Toniwebsite'
  }
});

const mailOptions = {
  from: 'noreplyjilanov@gmail.com',
  to: 'jilanovltd@gmail.com'
  // to: 'djilanov@gmail.com'
};
fs.readFile(__dirname + '/../email-templates/order-builded.html', function (err, html) {
  orderTemplate = html.toString();
});
fs.readFile(__dirname + '/../email-templates/message-builded.html', function (err, html) {
  contactTemplate = html.toString();
});

const buildOrderString = async (items, extras) => {
    let order = ``;
    order += '\nПродукти'
    // TODO: Await fetch all products and lit the selected items and extras
    for(let counter = 0; counter < items.length; counter++) {
        order += '\n' + items[counter]
    }
    order += '\nЕкстри'
    for(let counter = 0; counter < extras.length; counter++) {

    }
    return order;
}

const mailerService = () => {
    const sendOrderMail = async (data) => {
        const template = orderTemplate
            .replace('{{address}}', data.address || 'празно')
            .replace('{{email}}', data.email || 'празно')
            .replace('{{date}}', new Date())
            .replace('{{name}}', data.name || 'празно')
            .replace('{{phone}}', data.phone || 'празно')
            .replace('{{message}}', data.message || 'празно')
            .replace('{{order}}', await buildOrderString(data.items, data.extras) || 'празно');
        transporter.sendMail({
            ...mailOptions,
            subject: `${data.name} made new order`,
            html: template
        }, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }
    const sendMessageMail = (data) => {
        const template = contactTemplate
            .replace('{{email}}', data.email || 'празно')
            .replace('{{date}}', new Date())
            .replace('{{name}}', data.name || 'празно')
            .replace('{{phone}}', data.phone || 'празно')
            .replace('{{message}}', data.message || 'празно');
        transporter.sendMail({
            ...mailOptions,
            subject: `${data.name} send message`,
            html: template
        }, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }

    return {
        sendOrderMail,
        sendMessageMail
    };
};

module.exports = mailerService;