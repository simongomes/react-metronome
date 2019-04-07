import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            bpm: 1
        };
    }
    render() {
        return (
            <div>
                <p>{this.state.bpm}</p>
                <Slider
                    onChange={val => this.onChange(val)}
                    min={1}
                    max={200}
                />
            </div>
        );
    }

    onChange(bpmUpdate) {
        this.setState({ bpm: bpmUpdate });
    }
}

export default App;
