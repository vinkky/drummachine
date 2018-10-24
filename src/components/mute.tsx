import * as React from "react";

export class Mute extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
    };
  }

  public handleClick = () => {
    if (this.state.playing) {
      this.props.mute();
    } else {
      this.props.play();
    }
    this.setState({
      playing: !this.state.playing,
    });
  }
  public render() {
    const InstrumentStyle = {
      cursor: "pointer",
      fontSize: "0.5em",
      // tslint:disable-next-line:object-literal-sort-keys
      backgroundColor: this.state.playing ? "#2AC7DC" : "#696969",
      color: "white",
      marginLeft: "2px",
      marginTop: "2px",
      width: "40px",
      height: "2.0em",
      borderRadius: "10px",
  };
    return (
      <button style={InstrumentStyle} onClick={this.handleClick}>
        {this.state.playing ? "Mute" : "Play"}
      </button>
    );
  }
}
