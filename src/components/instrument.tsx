// tslint:disable-next-line:no-submodule-imports
import Slider from "@material-ui/lab/Slider";
import * as React from "react";
import Tone from "tone";
// tslint:disable-next-line:no-duplicate-imports
import { Time, Transport } from "tone";
import { Mute } from "../components/mute";
import { VolumeSlider } from "../components/UI-components/volumeSlider";
import { Clap } from "../engines/clap";
import { InstrumentEngine } from "../engines/engines";
import { HiHat } from "../engines/hat";
import { Kick } from "../engines/kick";
import { Snare } from "../engines/snare";

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
        false,
      ],
      value: 50,
      volume: 100,
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
  public componentDidUpdate() {
    if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
      this.setState({
        steps: this.props.steps.slice(0),
      });
      this.createLoop();
    }
  }
  public createLoop = () => {
    if (!this.props.steps) {
      return;
    }
    Transport.clear(this.loopId);
    const loop = (time: number) => {
      this.state.steps.forEach((s, i) => {
        if (s) {
          if (this.sound !== undefined) {
            this.sound.trigger(time + i * Time("16n").toSeconds());
          }
          this.player.start(time + i * Time("16n").toSeconds());
        }
      });
    };
    this.loopId = Transport.schedule(loop, "16n");
  }

  public handleClick = () => {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.engine, this.state.steps.slice(0));
    }
  }
  public paternClear = () => {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.engine, this.state.steps.slice(0));
    }
  }

  public mute = () => {
    if (this.sound) {
      this.sound.setVolume(0);
    }
    if (this.player) {
      this.player.volume.value = -10e3;
    }
  }

  public play = () => {
    if (this.sound) {
      this.sound.setVolume(this.state.volume / 100);
    }
    if (this.player) {
      this.player.volume.value = this.state.volume / 10;
    }
  }

  public volumeChange = (event, value) => {
    this.setState({ volume: value });
    if (this.sound) {
      this.sound.setVolume(this.state.volume / 100);
    }
    if (this.player) {
      this.player.volume.value = value - 60;
    }
    console.log(this.state.volume);
  }

  public clearPatern = () => {
    this.setState({ steps: new Array(16).fill(false) });
    if (this.props.handleClick) {
      this.props.handleClick(this.props.engine, new Array(16).fill(false));
    }
  }

  public render() {
    const InstrumentStyle = {
      backgroundColor: this.props.selected ? "#2AC7DC" : "#696969",
      borderRadius: "10px",
      boxShadow: "2px 2px 5px #222",
      color: "white",
      cursor: "pointer",
      display: "inline-block",
      fontSize: "0.5em",
      height: "1.5em",
      marginLeft: "2px",
      marginTop: "2px",
      width: "40px",
    };
    const StyleBot = {
      marginBottom: "5px",
    };

    return (
      <div>
        <Slider
          style={{ height: "60px" }}
          value={this.state.volume}
          onChange={this.volumeChange}
          vertical={true}
        />
        <br />
        <Mute play={this.play} mute={this.mute} /><br/>
        <div
          style={{ ...InstrumentStyle, ...StyleBot }}
          onClick={this.handleClick}
        >
          {this.props.engine}
        </div><br/>
        <button style={InstrumentStyle} onClick={this.clearPatern}>clear</button>
      </div>
    );
  }
}

export const areEqual = (ar1, ar2) => {
  if (ar1.length !== ar2.length) { return false; }
  let equal = true;
  ar1.forEach((el, idx) => {
    if (el !== ar2[idx]) { equal = false; }
  });
  return equal;
};
