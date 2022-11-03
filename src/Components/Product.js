import React, {Component} from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let variantImage =  this.props.product.images[0]
    let variant = this.props.product.variants[0]
    let variantQuantity =  1

    return (
      <div className="Product col-6">
        <div className="Product__innerWrapper">
          <img src={variantImage.src} alt=""/>
          <div className="product_descriptionContainer">
            <h2 className="Product__title">{this.props.product.title}</h2>
            <span className="Product__price">${variant.price}</span>
            <button className="Product__addToBundle button col-12" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bundle</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
