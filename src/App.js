import React, { Component } from 'react';
import Infinte from './components/Infinite';
import './App.css';

class App extends Component {
  state = { items: [], itemsLoading: true };

  componentDidMount = () => {
    let items = this.generateRandomNumbers(50);
    this.setState(() => ({
      items,
      itemsLoading: false
    }));
  };

  generateRandomNumbers = length => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100000));
  };

  fetchMore = () => {
    this.setState(() => ({
      itemsLoading: true
    }));
    console.log('called');
    let items = this.generateRandomNumbers(50);
    setTimeout(() => {
      this.setState(prevState => ({
        items: [...prevState.items, ...items],
        itemsLoading: false
      }));
    }, 3000);
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <Infinte loading={this.state.itemsLoading} action={this.fetchMore}>
          {items.map(item => (
            <h2 key={item}>{item}</h2>
          ))}
        </Infinte>
      </div>
    );
  }
}

export default App;
