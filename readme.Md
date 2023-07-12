# Multy Payment Gateway

**This repo is to build a multy-payment-gateway that allows user to pay in any aseert it want .**

## Support paying mastrer :
- BinancePay
- Paypal
- Wechat-pay
- Alipay
- InsPay

## How this repo work ?

**The logic as follows :**

- Customer create a order (we got an `orderId`)
- Use `orderId` to make order in support paying master . 
- Generate new order in database for record and moniting . 
- Waiting for call back from different call back server . 
- Confirm the order being paid . And recall the font-end for call back . 