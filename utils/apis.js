const req = require("./requster");
const axios = require('axios');
const tools = require("./tools")
require('dotenv').config()

async function binancePayBalance(data)
{
  
  return await dispatch_request(
    'POST', 
    '/binancepay/openapi/v2/balance',
    data
  )
}

async function binanceNewOrder(data)
{
  
  return await dispatch_request(
    'POST', 
    '/binancepay/openapi/order',
    data
  )
}

async function dispatch_request(http_method, path, payload = {}) {
  var ret 
  var baseURL = 'https://bpay.binanceapi.com'
  const timestamp = Date.now()
  const nonce = tools.randomStr(32)
  const payload_to_sign = timestamp + "\n" + nonce + "\n" + JSON.stringify(payload) + "\n"
  const url = baseURL + path
  const signature = tools.hash_signature(payload_to_sign)
  await axios.create({
    baseURL,
    headers: {
      'content-type': 'application/json',
      'BinancePay-Timestamp': timestamp,
      'BinancePay-Nonce': nonce,
      'BinancePay-Certificate-SN': process.env.BSC_KEY,
      'BinancePay-Signature': signature.toUpperCase()
    }
  }).request({
    'method': http_method,
    url,
    data: payload
  }).then(response => ret = (response.data)).catch(error => ret = (error))

  return ret;
}
module.exports = {
    dispatch_request,
    binancePayBalance,
    binanceNewOrder
}