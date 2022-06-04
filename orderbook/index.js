const Order = require('../order')

class OrderBook {
  #bids = []
  #asks = []

  get bids () {
    return this.#bids
  }

  get asks () {
    return this.#asks
  }

  get isBidsEmpty () {
    return this.#bids.length === 0
  }

  get isAsksEmpty () {
    return this.#asks.length === 0
  }

  addOrder (order = new Order()) {
    if (order.side === 'bid') {
      if (this.isAsksEmpty && order.type === 'market') return false

      this.#bids.push(order)

      return true
    }

    if (order.side === 'ask') {
      if (this.isBidsEmpty && order.type === 'market') return false

      this.#asks.push(order)

      return true
    }

    return false
  }
}

module.exports = OrderBook
