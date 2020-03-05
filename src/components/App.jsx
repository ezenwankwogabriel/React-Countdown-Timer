import React, { Component } from "react";
import UIfx from 'uifx'
import beepMp3 from '../my-sounds/beep-06.mp3'

import Input from "./CountDownInput";
import CountDown from "./CountDown";
import CountDownStatus from "./CounterStatus";
import SpeedFlow from "./FlowControl";

import "./styles.scss";

class App extends Component {
  state = {
    value: 0,
    minute: 0,
    seconds: 0,
    buttonText: "start",
    isRunning: false,
    minutesHand: "00",
    secondsHand: "00",
    timeSpeed: 1000,
    countDownStatus: "",
    countDownColor: "#fff",
    shouldBlink: false
  };

  componentDidMount() {}

  handleInputChange(value) {
    this.setState(state => ({
      ...state,
      value: Number(value),
      minute: Number(value)
    }));
  }

  handleStopButtonClick = () => {
    const { isRunning, value } = this.state;
    if (value >>> 0 !== parseFloat(value) || value === 0) return;
    if (isRunning) {
      clearInterval(this.intervalId);
      this.resetState();
    } else {
      this.setState(state => ({
        ...state,
        buttonText: "stop",
        isRunning: true,
        countDownStatus: ""
      }));
      this.countDownInterval();
    }
  };

  handleSpeedClick = value => {
    const { isRunning } = this.state;
    if (!isRunning) return;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.countDownFunction, value);
    this.setState(state => ({ ...state, timeSpeed: value }));
  };

  handlePauseClick = () => {
    const { isRunning, value } = this.state;
    if (value >>> 0 !== parseFloat(value) || value === 0) return;
    if (isRunning) {
      this.setState(state => ({ ...state, isRunning: false }));
      return clearInterval(this.intervalId);
    }
    this.setState(state => ({ ...state, isRunning: true, buttonText: "stop" }));
    this.intervalId = setInterval(this.countDownFunction, this.state.timeSpeed);
  };

  countDownInterval() {
    this.intervalId = setInterval(this.countDownFunction, this.state.timeSpeed);
  }

  leadingZeros(d) {
    if (d < 10) return "0" + d;
    return d;
  }

  countDownFunction = () => {
    if (this.state.minute > 0 || this.state.seconds > 0) {
      if (this.state.seconds === 0) {
        this.setState(state => ({
          ...state,
          seconds: 59,
          minute: state.minute - 1
        }));
      }
      if (this.state.value === 1) {
        if (Number(this.state.seconds) < 30) {
          this.setState(state => ({
            ...state,
            countDownStatus: "More than halfway there!"
          }));
        }
        this.lastSecondsChanges();
      } else if (Number(this.state.minute) < this.state.value / 2) {
        this.setState(state => ({
          ...state,
          countDownStatus: "More than halfway there!"
        }));
        this.lastSecondsChanges();
      }
      this.setState(state => ({
        seconds: state.seconds - 1,
        minutesHand: this.leadingZeros(this.state.minute).toString(),
        secondsHand: this.leadingZeros(this.state.seconds).toString()
      }));
    } else {
      this.clearTiming(true);
    }
  };

  lastSecondsChanges() {
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

  resetState(isDone) {
    console.log(this.state.isRunning, isDone);
    this.setState(state => ({
      ...state,
      value: 0,
      minute: 0,
      seconds: 0,
      buttonText: "start",
      isRunning: false,
      minutesHand: "00",
      secondsHand: "00",
      timeSpeed: 1000,
      countDownStatus: isDone ? "Time Up" : "",
      countDownColor: "#fff",
      shouldBlink: false
    }));
    if (isDone) new UIfx(beepMp3).play()
  }

  clearTiming(isDone) {
    this.resetState(isDone);
    clearInterval(this.intervalId);
  }

  render() {
    const {
      value,
      buttonText,
      minutesHand,
      secondsHand,
      countDownStatus,
      countDownColor,
      shouldBlink,
      isRunning
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Input
            value={value}
            onChange={event => this.handleInputChange(event.target.value)}
            buttonText={buttonText}
            onClick={this.handleStopButtonClick}
            isRunning={isRunning}
          />
          <CountDownStatus status={countDownStatus} />
          <CountDown
            minute={minutesHand}
            seconds={secondsHand}
            onPauseClick={this.handlePauseClick}
            countDownColor={countDownColor}
            shouldBlink={shouldBlink}
            isRunning={isRunning}
          />
          <SpeedFlow handleClick={value => this.handleSpeedClick(value)} />
        </header>
      </div>
    );
  }
}

export default App;
