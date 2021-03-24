const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();





app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// app.listen( 5000 )

app.listen((process.env.PORT ||3000 ), () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  },error=>{
    console.log(error);
  });
},error=>{
  console.log(error);
});

async function sendMail(user, callback) {
  console.log(user);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: 'new.era.officialteam@gmail.com', // sender address
    to: "new.era.officialteam@gmail.com", // list of receivers
    subject: `${user.subject}`, // Subject line
    html: `Hi Team, <br> my name is ${user.name} 
    <div><h3>my details are :</h3></div>
    <div>
      <ul>
        <li>${user.email}</li>
        <li>${user.number}</li>
      </ul>
    </div>
    <div>${user.message}</div>
    `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}