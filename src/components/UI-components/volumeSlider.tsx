// tslint:disable-next-line:no-submodule-imports
import Slider from "@material-ui/lab/Slider";
import * as React from "react";

export class VolumeSlider extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
        value: 50,
      };
  }
  public handleChange = (event, value) => {
    this.setState({ value });
  }

  public render() {

    return (
      <Slider
        style={{height: "60px"}}
        value={this.state.value}
        onChange={this.handleChange}
        vertical={true}
      />
    );
  }
}
