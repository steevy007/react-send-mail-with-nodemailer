require('dotenv').config()
const express=require('express')
const cors=require('cors')
const nodemailer=require('nodemailer')
const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cors())


let transporter=nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: '587',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  },
  secureConnection: 'false',
  tls: {
      ciphers: 'SSLv3'
  }
})
app.post('/send',(req,res)=>{
  const data={
    to:req.body.to,
    subject:req.body.subject,
    text:req.body.text
  }
    var mailOptions = {
        from: process.env.EMAIL,
        bcc: data.to,
        subject: data.subject,
        text: data.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({status:true,message:'Mail Envoye avec success'})
        }
      });
})

app.listen(PORT,()=>{
    console.log(`Server deployer sur le port : ${PORT}`)
})
