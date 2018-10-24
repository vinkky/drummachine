import * as React from "react";
import { Transport } from "tone";
import { Instrument } from "./instrument";
import { InstrumentHack } from "./instrument-hack";
import { PlayPause } from "./play";
import { Steps } from "./steps";
export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            steps: [false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false],
        };
        Transport.loop = true;
        Transport.loopEnd = "1m";
    }

    public pause = () => {
        Transport.stop();
    }

    public play = () => {
        Transport.bpm.value = 130;
        Transport.start();
    }

    public render() {
        return (
            <div>
                <h1>drum machine v0.01111111167b696969</h1>
                <PlayPause play={this.play} pause={this.pause} />
                <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument key="Kick" engine="Kick" handleClick={this.selectInstrument} />
                    <Instrument key="Snare" engine="Snare" handleClick={this.selectInstrument} />
                    <Instrument key="Clap" engine="Clap" handleClick={this.selectInstrument} />
                    <Instrument key="HiHat" engine="HiHat" handleClick={this.selectInstrument} />
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        );
    }

    private handleStepChange = (id: number) => {
        const s = this.state.steps;
        s[id] = !s[id];
        this.setState({
            steps: s,
        });
    }

    private selectInstrument = (selected: string, steps: boolean[]) => {
        if (this.state.selected === selected) {
            this.setState({
                selected: null, steps: [false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false],
            });
        } else {
            this.setState({ selected, steps });
        }
    }
}
