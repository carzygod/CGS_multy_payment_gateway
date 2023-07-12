var express = require('express');
var app = express();
var config = require("./config.json")
var tool = require("./utils/tools");
var payment = require("./utils/payment");
var callback = require("./utils/callback");

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var responser = {"code":200 , "status":"online"};

app.listen(4337, function() {
  console.log('service boot up')
})

app.get('/', function(req, res) {
  res.send(responser);
  res.end();
})

app.get('/ping', function(req, res) {
    res.send(responser);
    res.end();
})

app.post('/order/create/binance', async function(req, res) {
    var r = JSON.parse(JSON.stringify(responser));
    if(tool.createCheck(req.body))
    {
    //Map the data 
    var fee = Number(req.body.fee);
    var productName 
        if(req.body.productName)
        {
            productName = req.body.productName;
        }else{
            productName = config.defaultValue.binance.productName;
        }
    var productDetail;
        if(req.body.productDetail)
        {
            productDetail= req.body.productDetail;
        }else{
            productDetail= config.defaultValue.binance.productDetail;
        }
    var productType ;
        if(req.body.productType)
        {
            productType= req.body.productType;
        }else{
            productType= config.defaultValue.binance.productType;
        }

    r.data = await payment.binanceNewOrder({
        fee:fee,
        productName:productName,
        productType:productType,
        productDetail:productDetail,
        currency:config.defaultValue.binance.currency
    })
    }else{
        r.code = 400
        r.data = "Request body check failed"
    }
    
    res.send(r);
    res.end();
})