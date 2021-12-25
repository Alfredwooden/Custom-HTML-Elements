import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    showStockFinder: false
  }

  render() {
    let stockFinder = null;

    if (this.state.showStockFinder) {
      stockFinder =  <uc-stock-finder />;
    }
    
    return (
      <div className='App'>
        <uc-stock-price />
        {stockFinder}
        <button onClick={() => this.setState({showStockFinder: true})}>Show Finder</button>
      </div>
    )
  }
}

export default App;
