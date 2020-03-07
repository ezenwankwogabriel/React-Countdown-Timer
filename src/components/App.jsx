import React, { Component } from "react";

import CountDownComponent from './CountDownComponent';

import "./styles.scss";

class App extends Component {
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CountDownComponent />
        </header>
      </div>
    );
  }
}

export default App;
