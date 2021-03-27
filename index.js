const express = require('express');
var bodyParser = require('body-parser');
let priceValue=require('./setprice');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const port =process.env.port || 3000;

app.listen(port, function() {
    console.log('listening on 3000')
  });

    

  app.get('/', function (req, res) {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
  });

  app.get('/getValue', function (req, res) {
    res.json(priceValue);
  });

  app.post('/setvalue',function(req,res){
      priceValue=req.body.price;
      res.json(priceValue);
    //  console.log(req.body);
  })