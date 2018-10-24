import * as React from "react";

export class InstrumentHack extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    public render() {
        console.log("the selected si ", this.props.selectedInstrument);
        const childrenWithProps = React.Children.map(this.props.children, (child) => {
            if (typeof child === "object") {
                if (child.key === this.props.selectedInstrument) {
                    return React.cloneElement(child, { steps: this.props.steps, selected: true });
                } else {
                    return React.cloneElement(child, { steps: null, selected: false });
                }
            }
            return child;
        });

        return (
            <div style={{ display: "flex", flexDirection: "row"}}>
                {childrenWithProps}
            </div>
        );
    }
}
