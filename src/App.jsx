import React, { Component } from "react";
import Slider from "rc-slider";
import { AwesomeButton } from "react-awesome-button";
import "rc-slider/assets/index.css";
import "react-awesome-button/dist/themes/theme-c137.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            bpm: 1,
            buttonActive: false,
            bpmToMillisecond: 60000
        };

        // Bind functions
        this.onBpmChange = this.onBpmChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    render() {
        return (
            <div>
                <p>{this.state.bpm}</p>
                <Slider
                    onChange={this.onBpmChange}
                    min={1}
                    max={200}
                    disabled={this.state.buttonActive}
                />
                <AwesomeButton
                    type="primary"
                    size="medium"
                    className="start-button"
                    onPress={this.onButtonClick}
                >
                    {!this.state.buttonActive ? "START" : "STOP"}
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
        this.setState(prevState => ({ buttonActive: !prevState.buttonActive }));
        if (this.state.buttonActive === true) {
            clearInterval(this.timerID);
        } else {
            this.timerID = setInterval(
                () => this.beep(),
                this.state.bpmToMillisecond
            );
        }
    }

    beep() {
        console.log(
            "beep" +
                Math.random()
                    .toString(36)
                    .substring(7)
        );
    }
}

export default App;
