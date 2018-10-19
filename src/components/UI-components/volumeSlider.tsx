import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

 export class VolumeSlider extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
        value: 50,
      };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    return (
      <div style={{height: '60px'}} >
        <Slider
         
          value={this.state.value}
          onChange={this.handleChange}
          vertical
        />
      </div>
    );
  }
}