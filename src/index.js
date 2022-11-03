import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'shopify-buy';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const client = Client.buildClient({
  storefrontAccessToken: 'df6fc859931d69c4b8a6d2fbb6ea2286',
  domain: 'dime-beauty-demo.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
