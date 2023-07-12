const apis = require("./apis");
const tool = require("./tools");
require('dotenv').config()

// var order = {
//     fee:0,
//     productName:"",//option
//     productDetail:"",//option
//     productType:"",//option
//     currency:"",//option
// }

async function binanceNewOrder(o)
{
    var time = Date.now();
    var _pay = await apis.binanceNewOrder(
        {
            'merchantId': process.env.BSC_MERCHANTID,
            'merchantTradeNo': time,
            'tradeType': 'WEB',
            'totalFee': o.fee,
            'currency': o.currency,
            'productType': o.productType,
            'productName': o.productName,
            'productDetail': o.productDetail
          }
    )
    return _pay
}

async function wechatNewOrder()
{

}

module.exports = {
    binanceNewOrder,
    wechatNewOrder
}