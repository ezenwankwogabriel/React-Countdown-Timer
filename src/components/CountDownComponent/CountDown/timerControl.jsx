import React from 'react';
import UIfx from 'uifx'
import beepMp3 from '../../../my-sounds/beep-06.mp3'

class Timer extends React.Component {
    static defaultProps = {
        speed: 1,
        value: 0,
    }
    initialState = {
        minute: 1,
        seconds: 0,
        started: false,
        minutesHand: '00',
        secondsHand: '00',
        shouldBlink: false,
        countDownColor: '#ffffff',
    };
    state = this.initialState;
    componentDidUpdate(prevProps) {
        if (prevProps.action !== this.props.action) {
            switch (this.props.action) {
                case 'start': this.onStart(); break;
                case 'reset': this.onReset(); break;
                case 'pause': this.onPause(); break;
                case 'resume': this.onPause(); break;
                default: this.onStop(); break;
            }
        }
        if (prevProps.speed !== this.props.speed) {
            this.onIncrement();
        } 
    }
    componentWillUnmount() {
        if (this.stateintervalId) {
          clearTimeout(this.state.intervalId);
        }
    }
    countDownFunction = () => {
        let { minute, seconds } = this.state;
        const { value } = this.props;
        if (minute > 0 || seconds > 0) {
            if (seconds === 0) this.setState(state => ({ ...state, seconds: 59, minute: state.minute - 1 }));
            if (value === 1) {
                if (Number(seconds) < 30) this.setState(state => ({ ...state, countDownStatus: "More than halfway there!" }));
                this.lastSecondsChanges();
            } else if (Number(minute) < value / 2) {
                this.setState(state => ({ ...state, countDownStatus: "More than halfway there!" }));
                this.lastSecondsChanges();
            }
            this.setState(state => ({
                seconds: state.seconds - 1,
                minutesHand: this.leadingZeros(state.minute).toString(),
                secondsHand: this.leadingZeros(state.seconds).toString()
            }));
        } else {
            this.clearTiming(true);
        }
    }
    lastSecondsChanges = () => {
        if (Number(this.state.minute === 0)) {
          if (Number(this.state.seconds) === 19) {
            this.setState(state => ({
              ...state,
              countDownColor: "rgb(241, 6, 6)"
            }));
          }
          if (Number(this.state.seconds) === 9) {
            this.setState(state => ({ ...state, countDownColor: "rgb(241, 6, 6)", shouldBlink: true }));
          }
          if (Number(this.state.seconds) === 0) {
            /** change text to red */ console.log("Times up");
          }
        }
      }
    onStart = () => {
        const { speed, value } = this.props;
        if (value <= 0 || value >>> 0 !== parseFloat(value)) return;
        this.setState((state) => ({...state, minute: value, started: true}));
        this.intervalId = setInterval(this.countDownFunction, speed * 1000);
    }
    leadingZeros = (d) => {
        if (d < 10) return "0" + d;
        return d;
    }
    clearTiming(isDone) {
        this.setState(this.initialState);
        clearInterval(this.intervalId);
        if (isDone) new UIfx(beepMp3).play()
    }
    onReset = () => {
        this.clearTiming();
    }
    onPause = () => {
        const { started } = this.state;
        const { value, speed } = this.props;
        if (value >>> 0 !== parseFloat(value) || value === 0) return;
        if (started) {
            this.setState(state => ({ ...state, started: false }));
            return clearInterval(this.intervalId);
        }
        this.setState(state => ({ ...state, started: true }));
        this.intervalId = setInterval(this.countDownFunction, speed * 1000);
    }
    
    onIncrement = () => {
        if (!this.state.started) return;
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.countDownFunction, 1000 / this.props.speed)
    }

    render() {
        const { shouldBlink, countDownColor, secondsHand, minutesHand } = this.state;
        return (
            <div data-testid="app-countdown">
               <p className="countdown-content" >
                 <span className={shouldBlink ? 'blinking': ''} style = {{ color: countDownColor }}> {minutesHand}:{secondsHand} </span>  
               </p>
             </div>
          )
    }
}

export default Timer;