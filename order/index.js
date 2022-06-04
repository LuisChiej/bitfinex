const orderTypes = require('../types/orderType')
const orderAction = require('../types/orderAction')

class Order {
  #type = orderTypes.market
  #action = orderAction.buy
  #side = 'bid'
  #quantity = 0
  #filledQuantity = 0
  #price
  #time
  #isActive = true
  #owner

  constructor ({ type = orderTypes.market, action = orderAction.buy, price, quantity, owner }) {
    this.#type = type
    this.#action = action
    this.#price = price
    this.#quantity = quantity
    this.#time = Date.now()
    this.#owner = owner
  }

  get type () { return this.#type }

  get action () { return this.#action }

  get side () { return this.#side }

  get quantity () { return this.#quantity }

  get filledQuantity () { return this.#filledQuantity }

  get price () { return this.#price }

  get time () { return this.#time }

  get isActive () { return this.#isActive }

  get owner () { return this.#owner }

  set isActive (isActive) { this.#isActive = isActive }
}

module.exports = Order
