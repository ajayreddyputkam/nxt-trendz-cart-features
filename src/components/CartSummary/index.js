// Write your code here

import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalItems = cartList.length
      const totalCartPrice = () => {
        const totalPrice = cartList.map(
          eachObject => eachObject.quantity * eachObject.price,
        )
        const cartPrice = totalPrice.reduce(
          (currentValue, nextValue) => currentValue + nextValue,
        )
        return cartPrice
      }

      return (
        <div className="cart-summary-main-container">
          <div className="order-price-items-container-summary">
            <h1 className="price-details-text-cart-summary">
              <span className="order-total-cart-summary">Order Total:</span> Rs{' '}
              {totalCartPrice()}/-
            </h1>
            <p className="num-of-items-cart-summary">
              {totalItems} items in cart
            </p>
          </div>
          <button type="button" className="checkout-button-cart-summary">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
