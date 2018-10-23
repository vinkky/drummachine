import * as React from "react";

export class Mute extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      playing: true
    };
  }

  public handleClick = () => {
    if (this.state.playing) {
      this.props.mute();
    } else {
      this.props.play();
    }
    this.setState({
      playing: !this.state.playing
    });
  };
  render() {
    const InstrumentStyle = {};
    return (
      <button style={InstrumentStyle} onClick={this.handleClick}>
        {this.state.playing ? "Mute" : "Play"}
      </button>
    );
  }
}
