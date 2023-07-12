const apis = require("./utils/apis");
const tool = require("./utils/tools");

async function init()
{
    var _b  = await apis.binancePayBalance(
        {
            "wallet": "SPOT_WALLET",
            "currency": "USDT"
        }
    )
    console.log(_b.data)

    var time = Date.now();
    console.log(time)
    var _pay = await apis.binanceNewOrder(
        {
            'merchantId': '123456789',
            'merchantTradeNo': time,
            'tradeType': 'WEB',
            'totalFee': '0.01',
            'currency': 'USDT',
            'productType': 'fruit',
            'productName': 'Gas fee',
            'productDetail': 'Pay for the gas fee . '
          }
    )
    console.log(_pay)
}

init()