import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../CountDownSpeedControl/ControlButton'
import PauseControl from './pauseControl';
import Timer from './timerControl'; 
import Input from './inputControl';
import './styles.scss'

export const CountDownContext = React.createContext({});

const CountDownConsumer = (props) => {
  return (
    <CountDownContext.Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error('context cannot exist outside a provider')
        }
        return props.children(context)
      }}
    </CountDownContext.Consumer>
  )
} 

class CountDown extends React.Component {
  static defaultProps = {
    minute: '00',
    seconds: '00',
    countDownColor: '#fff',
    shouldBlink: false,
  };
  
  static Input = (props) => {
    return <CountDownConsumer>
      {({ started, setState, value}) => <Input
          setCountState={setState}
          value={value}
          started={started}
        />}
    </CountDownConsumer>
  }
  static Timer = ({children}) => {
    return <CountDownConsumer>
      {(context) => (
        <Timer {...context}/>
      )}
    </CountDownConsumer>
  };
  static Control = () => {
    return <CountDownConsumer>
      {({setState, started}) => (
        <PauseControl setCountState={setState} started={started}/>
      )}
    </CountDownConsumer>
  };
  static Fast = ({value=1}) => {
    return <CountDownConsumer>
      {({setState}) => <ControlButton value={value} setCountState={setState}/>}
    </CountDownConsumer>
  };
  static Content = ({children}) => { 
    return <CountDownConsumer>
      {() => children}
    </CountDownConsumer>
    // children ? children : <div data-testid="app-status" className="count-down-status">{status}</div>
  };

  actionType = { start: 1, pause: 1, resume: 1, reset: 1, increment: 1 };
  
  setCountState = (query) => this.setState((state) => ({...state, ...query}));

  initialProps = {
    action: '',
    speed: 1,
    value: 0,
    setState: this.setCountState,
    setAction: this.setAction,
    resetStart: this.resetStartState,
  };
  state = this.initialProps;
  // manage state for count down
  render() {
    return (
      <CountDownContext.Provider value={this.state}>
        {this.props.children}
      </CountDownContext.Provider>
    )
  }
}

CountDown.propTypes = {
  minute: PropTypes.string,
  seconds: PropTypes.string,
  countDownColor: PropTypes.string,
  shouldBlink: PropTypes.bool,
}

export default CountDown;