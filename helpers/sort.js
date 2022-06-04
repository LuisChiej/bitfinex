const Order = require('../order')

/**
 * makeComparator
 * FIFO - https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/matching-orders/
 * buy order’s maximum price exceeds or equals the sell order’s minimum price
    Buy orders are sorted in descending order by their bid price and ascending order by time stamp
    for orders that have the same price.
    Orders with the highest bid (buy) price are kept at the top of the queue and will be executed first.
    For equal priced bids, the order that arrives first is executed first.
    Sell orders are sorted in ascending order by their ask price, and like buy orders,
    by ascending order by time stamp for orders with the same price.
    Orders with the lowest sell (ask) prices will be sold first.
    For orders with the same ask price, the order that arrives first will be sold first.
*/

// new Order() used to enable type inference as javascript is weakly typed

const sortSellOrders = (a = new Order(), b = new Order()) => {
  return a.price > b.price ? 1 : a.price === b.price ? a.time > b.time ? 1 : -1 : -1
}

const sortBuyOrders = (a = new Order(), b = new Order()) => {
  return a.price > b.price ? -1 : a.price === b.price ? a.time > b.time ? 1 : -1 : 1
}

const sortExpensivePrice = (a = new Order(), b = new Order()) => {
  return a.price > b.price ? -1 : 1
}

const sortLessPrice = (a = new Order(), b = new Order()) => {
  return a.price < b.price ? -1 : 1
}

const sortOldestTime = (a = new Order(), b = new Order()) => {
  return a.time > b.time ? 1 : -1
}

const sortNewestTime = (a = new Order(), b = new Order()) => {
  return a.time < b.time ? -1 : 1
}

module.exports = {
  sortSellOrders,
  sortBuyOrders,
  sortExpensivePrice,
  sortLessPrice,
  sortOldestTime,
  sortNewestTime
}
