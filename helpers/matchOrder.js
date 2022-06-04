const Order = require('../order')
const { sortBuyOrders, sortSellOrders } = require('./sort')
const orderAction = require('../types/orderAction')
const orderType = require('../types/orderType')

const matchOrders = (order = new Order(), market = [new Order()]) => {
  const isBuy = order.action === orderAction.buy
  const isLimit = order.type === orderType.limit

  // filter out buy orders in the market
  let offers = market.filter((m) => isBuy ? m.action === orderAction.sell : m.action === orderAction.buy)

  // Use FIFO simple matching algorithm to sort the orders
  const sorted = offers.sort(isBuy ? sortSellOrders : sortBuyOrders)

  if (!isLimit) {
    offers = offers.filter((o) => o.type !== 'market')
  }

  if (sorted.length === 0) {
    return {
      orders: [],
      totalOrdersFilled: 0
    }
  }

  // const orderName = `${order.action.toLocaleUpperCase()} @${order.price}`
  const quantity = order.quantity
  let quantityLeft = quantity
  const probableMatches = []

  for (const offer of sorted) {
    const currentOfferQuantity = offer.quantity - (offer.filledQuantity)

    if (offer.owner === order.owner) continue

    if (quantityLeft <= 0) break

    const isQuantityFilled = quantityLeft <= offer.quantity

    if (isBuy) { // Buy
      if (isLimit) {
        if (order.price >= offer.price) {
          if (isQuantityFilled) {
            probableMatches.push([offer, quantityLeft])
            quantityLeft = 0
            break
          } else {
            quantityLeft -= currentOfferQuantity
            probableMatches.push([offer, currentOfferQuantity])
          }
        }
      } else { // Market order
        if (order.price >= offer.price) {
          if (isQuantityFilled) {
            probableMatches.push([offer, quantityLeft])
            quantityLeft = 0
            break
          } else {
            quantityLeft -= currentOfferQuantity
            probableMatches.push([offer, currentOfferQuantity])
          }
        }
      }
    } else { // Sell
      if (isLimit) {
        if (order.price <= offer.price) {
          if (isQuantityFilled) {
            probableMatches.push([offer, quantityLeft])
            quantityLeft = 0
            break
          } else {
            quantityLeft -= currentOfferQuantity
            probableMatches.push([offer, currentOfferQuantity])
          }
        }
      } else {
        if (order.price <= offer.price) {
          if (isQuantityFilled) {
            probableMatches.push([offer, quantityLeft])
            quantityLeft = 0
            break
          } else {
            quantityLeft -= currentOfferQuantity
            probableMatches.push([offer, currentOfferQuantity])
          }
        }
      }
    }
  }

  let totalOrdersFilled = 0

  probableMatches.forEach((n) => {
    totalOrdersFilled += n[1]
  })

  return {
    totalOrdersFilled,
    orders: probableMatches
  }
}

module.exports = {
  matchOrders
}
