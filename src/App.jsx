import React, { Component } from 'react';
import Slider from 'rc-slider';
import { AwesomeButton } from 'react-awesome-button';
import 'rc-slider/assets/index.css';
import 'react-awesome-button/dist/themes/theme-c137.css';
// Import audio
import tick from './audio/tick.wav';
import tock from './audio/tock.wav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bpm: 1,
      playing: false,
      bpmToMillisecond: 60000,
      ticker: 0,
      tick: [new Audio(tick), new Audio(tock)]
    };

    // Bind functions
    this.onBpmChange = this.onBpmChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  render() {
    const { bpm, playing } = this.state;
    return (
      <div className="metronome-wrap">
        <p>{bpm}</p>
        <Slider
          onChange={this.onBpmChange}
          min={1}
          max={200}
          disabled={playing}
        />
        <AwesomeButton
          type="primary"
          size="medium"
          className="start-button"
          onPress={this.onButtonClick}
        >
          {playing ? 'START' : 'STOP'}
        </AwesomeButton>
      </div>
    );
  }

  // Update BPM
  onBpmChange(bpmUpdate) {
    this.setState({
      bpm: bpmUpdate,
      bpmToMillisecond: 60000 / bpmUpdate
    });
  }

  // Activate and Deactivate
  onButtonClick() {
    this.setState(({ playing }) => ({ playing: !playing }));
    if (this.state.playing === true) {
      clearInterval(this.timerID);
    } else {
      this.timerID = setInterval(
        () => this.beep(),
        this.state.bpmToMillisecond
      );
    }
  }

  // Play the dound
  beep() {
    const { tick, ticker } = this.state;
    tick[ticker].play();

    // Switch the ticker index to play tick and tock
    this.setState(({ ticker }) => ({ ticker: ticker * -1 + 1 }));
  }
}

export default App;
