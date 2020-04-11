import React from "react";
import CountDownComponent from "./CountDown";

import "./styles.scss";

const App = () => {
  return (
    <CountDownComponent>
      <CountDownComponent.Input />
      <CountDownComponent.Content>
        <div data-testid="app-status" className="count-down-status">{'Active'}</div>
      </CountDownComponent.Content>
      <CountDownComponent.Timer />
      <CountDownComponent.Control />
      <CountDownComponent.Fast value={1} />
      <CountDownComponent.Fast value={1.5}/>
      <CountDownComponent.Fast value={2}/>
    </CountDownComponent>
  )
}

export default App;
