import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const isItemExist = cartList.find(
      eachObject => eachObject.id === product.id,
    )
    if (isItemExist === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newQuantity = isItemExist.quantity + product.quantity
      const updatedCartList = cartList.map(eachObject => {
        if (eachObject.id === product.id) {
          return {...eachObject, quantity: newQuantity}
        }
        return eachObject
      })
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const listAfterRemovalOfItem = cartList.filter(
      eachObject => eachObject.id !== id,
    )
    this.setState({cartList: listAfterRemovalOfItem})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decrementedQuantityItem = cartList.find(
      eachObject => eachObject.id === id,
    )

    if (decrementedQuantityItem.quantity > 1) {
      const updatedQuantityList = cartList.map(eachObject => {
        if (eachObject.id === id) {
          const decrementedQuantity = eachObject.quantity - 1
          return {...eachObject, quantity: decrementedQuantity}
        }
        return eachObject
      })
      this.setState({cartList: updatedQuantityList})
    } else {
      const removedItemList = cartList.filter(
        eachObject => eachObject.id !== id,
      )
      this.setState({cartList: removedItemList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const listAfterIncrement = cartList.map(eachObject => {
      if (eachObject.id === id) {
        const incrementedQuantity = eachObject.quantity + 1
        return {...eachObject, quantity: incrementedQuantity}
      }
      return eachObject
    })
    this.setState({cartList: listAfterIncrement})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
