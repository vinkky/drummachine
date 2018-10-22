import * as React from "react";
import { Time, Transport } from "tone";
import { Clap } from "../engines/clap";
import { InstrumentEngine } from "../engines/engines";
import { HiHat } from "../engines/hat";
import { Kick } from "../engines/kick";
import { Snare } from "../engines/snare";
import  Tone  from "tone";

import { VolumeSlider } from "../components/UI-components/volumeSlider"

export interface InstrumentProps {
    engine: string;
    steps?: boolean[];
    handleClick?: (engine: string, steps:boolean[]) => void;
    selected?: boolean;
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private ctx: AudioContext;
    private sound: InstrumentEngine;
    private player: Tone.Player;
    private loopId: number;

    constructor(props) {
        super(props);
        this.ctx = new AudioContext;
        this.player = new Tone.Player("./Clap.wav");
        this.state = {
            index: 0,
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
        }
        switch (props.engine) {
            case 'Kick':
            this.player = new Tone.Player("./Kick2.wav").toMaster();
                break;
            case 'Snare':
                this.sound = new Snare(this.ctx)
                break;
            case 'HiHat':
                this.sound = new HiHat(this.ctx);
                break;
            case 'Clap':
                this.player = new Tone.Player("./Clap.wav").toMaster();
                break;
            case 'Tom':
                this.sound = new Tone.Player("/")
        }
    }

    componentDidUpdate() {
        if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();

        }
    }
    testClickHandle = () => {
        if(this.sound){
            this.sound.setVolume(0); 
        }
        if(this.player){
            this.player.volume.value = -10e9
        }
        console.log(this.player)
               
    }
    createLoop = () => {
        if (!this.props.steps) { return; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            this.state.steps.forEach((s, i) => {
                if (s) {
                    if(this.sound != undefined){
                        this.sound.trigger(time + i * Time('16n').toSeconds())
                    }
                    this.player.start(time + i * Time('16n').toSeconds())
                }
                this.setState({index: i})
            });
        }
        this.loopId = Transport.schedule(loop, "0");
    }

    handleClick = () => {
        if (this.props.handleClick) this.props.handleClick(this.props.engine, this.state.steps.slice(0));
    }

    render() {
        console.log('index' ,this.state.index)
        const InstrumentStyle = {
            cursor: 'pointer',
            fontSize: '0.5em',
            backgroundColor: this.props.selected ? '#2AC7DC' : '#696969',
            color: 'white',
            boxShadow: '2px 2px 5px #222',
            marginLeft: '2px',
            marginTop: '2px',
            width: '40px',
            height: '1.5em',
            borderRadius: '10px',
            display: 'inline-block',
        }
        const StyleBot = {
            marginBottom: '5px'
        }
        const Slider = {
            height: '100px'
        }
        return (<div>
            <VolumeSlider style={Slider}/>
            <h1>{this.state.index}</h1>
            <div style={InstrumentStyle} onClick={this.testClickHandle}>mute</div><br/>
                <div style={{...InstrumentStyle, ...StyleBot}} onClick={this.handleClick}>
                {this.props.engine}
            </div >
        </div>

        )
    }
}

export const areEqual = (ar1, ar2) => {
    if (ar1.length !== ar2.length) return false;
    let equal = true;
    ar1.forEach((el, idx) => {
        if (el !== ar2[idx]) equal = false;
    });
    return equal;
}