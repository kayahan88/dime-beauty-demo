import React, { Component } from 'react';
import Products from './Components/Products';
import Cart from './Components/Cart';
import nearMe from './assets/icons8-near-me-24.png'
import signal from './assets/icons8-signal-50.png'
import wifi from './assets/icons8-wi-fi-50.png'
import battery from './assets/icons8-full-battery-25.png'
import caret from './assets/icons8-less-than-50.png'

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      value: 0,
      remainingAmountToSpend: 100,
      amountSaved: 0
    };

    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
  }

  componentWillMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });

    this.props.client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
      if(this.state.checkout.totalPrice >= 100){
        this.handleSliderChange();
        this.handleAmountSaved();
      } else {
        this.handleRemainingAmountToSpend();
      }
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  handleSliderChange() {
      this.setState({
        value: 50
      })
  }

  handleAmountSaved(){
    this.setState({
      amountSaved: Math.round(this.state.checkout.totalPrice * .1)
    })
  }

  handleRemainingAmountToSpend(){
    this.setState({
      remainingAmountToSpend: 100 - this.state.checkout.totalPrice
    })
  }

  Header = () => {
    return(
      <div className="container-fluid App__Header">
        <div className="row App__Header_statusBar">
            <div className="col-6 statusBarTime">
              <div>11:32</div>
              <img alt="" src={nearMe}/>
            </div>
            <div className="col-6 statusBarIcons">
              <img alt="" src={signal}/>
              <img alt="" src={wifi}/>
              <img alt="" src={battery}/>
            </div>
        </div>
        <div className="App__Header_pageTitle">
          <img alt="" src={caret} />
          <h1>Add Product</h1>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <this.Header />
        <Products
          products={this.state.products}
          client={this.props.client}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          updateQuantityInCart={this.updateQuantityInCart}
          handleSliderChange={this.state.value}
          handleAmountSaved={this.state.amountSaved}
          handleRemainingAmountToSpend={this.state.remainingAmountToSpend}
        />
      </div>
    );
  }
}

export default App;
