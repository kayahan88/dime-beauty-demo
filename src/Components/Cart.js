import React, {Component} from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    return (
      <div className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}>
        <div className="Cart__header">
          {
            this.props.checkout.totalPrice < 100 ? 
            <div>Add <span className="bold">${this.props.handleRemainingAmountToSpend}</span> to save <span className="bold">10%</span></div>
            :
            <div>You're saving <span className="bold">10%</span>! &#127881;	</div>
          }
        </div>

        <div className="row cart_body">
          <div className="col-6 cart_bundlePrice">
            <div>Bundle Price</div>
            <div className="amount">${this.props.checkout.subtotalPrice}</div>
          </div>
          <div className="col-6 cart_yourSavings">
            <div>Your Savings</div>
            <div className="amount">${this.props.handleAmountSaved}</div>
          </div>
          <div className="col-12 sliderContainer">
            <input 
            className="slider" 
            type="range" 
            min="0" 
            max="100" 
            value={this.props.handleSliderChange} 
            step="1" />
            <div className="col-12 slider_sliderSteps">
              <div className='sliderSteps'>
                <div className='sliderStep'></div>
                <div className='sliderStep'></div>
                <div className='sliderStep'></div>
                <div className='sliderStep'></div>
              </div>
              </div>
            <div className="col-12 slider_percentages">
              <div className='percentages'>
                <div className='percentage'>10%</div>
                <div className='percentage'>15%</div>
                <div className='percentage'>20%</div>
                <div className='percentage'>25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;
