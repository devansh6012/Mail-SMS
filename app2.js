const express = require('express')
const nodemailer = require('nodemailer');

const app = express();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "mikel.kuhn74@ethereal.email",
      pass: "rbuc7rkwE8NUzbdgTR",
    },
  });

  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"devansh "<mikel.kuhn74@ethereal.email>', // sender address
      to: "devansh6012@gmail.com", // list of receivers
      subject: "Hello ", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);


app.listen(5000, () => console.log('Listening at port 5000'));











// async function sendMailHTMLTemp(emailTo,esubjects,message,Heading){

//     try{
      
//       var transporter = nodemailer.createTransport({
//         host: '172.17.10.90',
//         port: 25,
//         secure: false,
//       });
//       // const content = fs.readFileSync( path.resolve(__dirname, './app/templates/invoice.html'),
//       //     'utf-8'
//       // )
//       readHTMLFile(__dirname + '/SPIN-HTML/index2.html', function(err, html) {
//         if (err) {
//            console.log('error reading file', err);
//            return;
//         }
//         var template = handlebars.compile(html);
//         var replacements = {
//           TeamName: "TEAM SPIN",
//           message:message,
//           heading:Heading
//         };
//         var htmlToSend = template(replacements);
       
//         var mailOptions = {
//             from: 'no-reply-evsupport@mailer.exicom.in',
//             to : emailTo,
//             subject : esubjects,
//             html : htmlToSend
//          };
//          transporter.sendMail(mailOptions, function (error, response) {
          
//             if (error) {
//                 console.log(error);
//             }
//         });
//       });
     
//     }
//     catch(err){
//       console.log(err);
//     }
   
//   }