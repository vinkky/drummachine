import * as React from "react";
import { Time, Transport } from "tone";
import { Clap } from "../engines/clap";
import { InstrumentEngine } from "../engines/engines";
import { HiHat } from "../engines/hat";
import { Kick } from "../engines/kick";
import { Snare } from "../engines/snare";
import Tone from "tone";
import Slider from "@material-ui/lab/Slider";
import { Mute } from "../components/mute";
import { VolumeSlider } from "../components/UI-components/volumeSlider";

export interface InstrumentProps {
  engine: string;
  steps?: boolean[];
  handleClick?: (engine: string, steps: boolean[]) => void;
  selected?: boolean;
}

export class Instrument extends React.Component<InstrumentProps, any> {
  private ctx: AudioContext;
  private sound: InstrumentEngine;
  private player: Tone.Player;
  private loopId: number;

  constructor(props) {
    super(props);
    this.ctx = new AudioContext();
    this.player = new Tone.Player("./Clap.wav");
    this.state = {
      index: 0,
      steps: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      volume: 100,
      value: 50
    };
    switch (props.engine) {
      case "Kick":
        this.player = new Tone.Player("./Kick2.wav").toMaster();
        break;
      case "Snare":
        this.sound = new Snare(this.ctx);
        break;
      case "HiHat":
        this.sound = new HiHat(this.ctx);
        break;
      case "Clap":
        this.player = new Tone.Player("./Clap.wav").toMaster();
        break;
      case "Tom":
        this.sound = new Tone.Player("/");
    }
  }
  componentDidUpdate() {
    if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
      this.setState({
        steps: this.props.steps.slice(0)
      });
      this.createLoop();
    }
  }
  createLoop = () => {
    if (!this.props.steps) {
      return;
    }
    Transport.clear(this.loopId);
    const loop = (time: number) => {
      this.state.steps.forEach((s, i) => {
        if (s) {
          if (this.sound != undefined) {
            this.sound.trigger(time + i * Time("16n").toSeconds());
          }
          this.player.start(time + i * Time("16n").toSeconds());
        }
      });
    };
    this.loopId = Transport.schedule(loop, "0");
  };

  handleClick = () => {
    if (this.props.handleClick)
      this.props.handleClick(this.props.engine, this.state.steps.slice(0));
  };

  mute = () => {
    if (this.sound) {
      this.sound.setVolume(0);
    }
    if (this.player) {
      this.player.volume.value = -10e3;
    }
  };

  play = () => {
    if (this.sound) {
      this.sound.setVolume(this.state.volume/100);
    }
    if (this.player) {
      this.player.volume.value = this.state.volume/10;
    }
  };

  volumeChange = (event, value) => {
    this.setState({volume: value });
    if (this.sound) {
        this.sound.setVolume(this.state.volume/100);
      }
      if (this.player) {
        this.player.volume.value = value-60;
      }
      console.log(this.state.volume)
  };

  render() {
    console.log("index", this.state.index);
    const InstrumentStyle = {
      cursor: "pointer",
      fontSize: "0.5em",
      backgroundColor: this.props.selected ? "#2AC7DC" : "#696969",
      color: "white",
      boxShadow: "2px 2px 5px #222",
      marginLeft: "2px",
      marginTop: "2px",
      width: "40px",
      height: "1.5em",
      borderRadius: "10px",
      display: "inline-block"
    };
    const StyleBot = {
      marginBottom: "5px"
    };

    return (
      <div>
                <Slider
      style={{height: '60px'}}
      value={this.state.volume}
      onChange={this.volumeChange}
      vertical
    />
        <br />
        <Mute play={this.play} mute={this.mute} />
        <div
          style={{ ...InstrumentStyle, ...StyleBot }}
          onClick={this.handleClick}
        >
          {this.props.engine}
        </div>
      </div>
    );
  }
}

export const areEqual = (ar1, ar2) => {
  if (ar1.length !== ar2.length) return false;
  let equal = true;
  ar1.forEach((el, idx) => {
    if (el !== ar2[idx]) equal = false;
  });
  return equal;
};
