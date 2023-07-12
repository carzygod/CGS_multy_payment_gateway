
var crypto = require('crypto');
require('dotenv').config()


function sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function randomStr(length) {
    return crypto.randomBytes(length).toString('hex').substring(0,length);
  }


function encodeHMAC(data){
    return crypto.createHmac('SHA512', process.env.BSC_SEC).update(data).digest('hex').toUpperCase();
}

function hash_signature(query_string) {
    return crypto
        .createHmac('sha512', process.env.BSC_SEC)
        .update(query_string)
        .digest('hex');
  }

function encodeBuy(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&side=BUY&type=MARKET&quantity='+data.num+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}


function encodeLimitBuy(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&side=BUY&type=LIMIT&quantity='+data.num+"&price="+data.price+'&timeInForce='+data.timeInForce+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}
function encodeSell(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&side=SELL&type=MARKET&quantity='+data.num+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}
function encodeLimitSell(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&side=SELL&type=LIMIT&quantity='+data.num+"&price="+data.price+'&timeInForce='+data.timeInForce+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}

function encodeLimitMonit(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}
function encodeHistoryOrder(data){
    var time = Date.now();
    var encodeData = 'symbol='+data.pair+'&limit='+data.limit+'&timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}

function encodeAccount(){

    var time = Date.now();
    var data = {}
    var encodeData = 'timestamp='+time;
    encodeData = encodeHMAC(encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}

function encodeSelf(data){
  var time = Date.now();
  var encodeData =Object.keys(data)[0]+"="+data[Object.keys(data)[0]];
  for(var i =1 ; i < Object.keys(data).length; i++)
  {
    encodeData+="&"+Object.keys(data)[i]+"="+data[Object.keys(data)[i]];
  }

  var nonce = randomStr(32);
  var content = time + "\n" + nonce + "\n"
  const payload_to_sign = time + "\n" + nonce + "\n" + JSON.stringify(data) + "\n"

  encodeData += '&BinancePay-Timestamp='+time+"&BinancePay-Nonce="+nonce;
  data.url = encodeData;
  encodeData =(hash_signature(payload_to_sign)).toUpperCase()
  data.time = time;
  data.nonce = nonce;
  data.sign = encodeData;
  return data;
}

/**
 * Body check 
 */

function createCheck(data)
{
    if(data.fee&&Number(data.fee)>0)
    {
        return true;
    }
    return false;

}


module.exports = {
    sleep,
    encodeHMAC,
    encodeBuy,
    encodeSell,
    encodeLimitSell,
    encodeLimitMonit,
    encodeLimitBuy,
    encodeHistoryOrder,
    encodeAccount,
    encodeSelf,
    randomStr,
    hash_signature,
    createCheck
}