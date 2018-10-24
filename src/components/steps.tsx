import * as React from "react";
import { Step } from "./step";

export class Steps extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {this.props.steps.map((step, idx) => {
                    return (
                        <Step on={step} onClick={this.props.handleStepChange} key={idx} id={idx} current = {this.props.index}  />
                    );
                })}
            </div>
        );
    }
}
