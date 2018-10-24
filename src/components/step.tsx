import * as React from "react";

// tslint:disable-next-line:interface-name
export interface StepProps {
    id: number;
    onClick: (id: number) => void;
    on: boolean;
}

export class Step extends React.Component<StepProps> {

    public render() {

        console.log(this.props.id);
        const style = {
            width: "2.5em",
            // tslint:disable-next-line:object-literal-sort-keys
            height: "5em",
            backgroundColor: this.props.on &&
            this.props.id % 4 === 0 ? "#2AC7DC" :
            this.props.on ? "#2AC7DC" :
            this.props.id % 4 === 0 ? "#b6b6b6" : "#CBCBCB",
            borderRadius: "10px",
            marginLeft: 2,
            display: "inline-block",
        };

        return (
            <div style={style} onClick={this.handleClick}>
            <h5>{this.props.id + 1}</h5></div>
        );
    }

    private handleClick = () => {
        this.props.onClick(this.props.id);
    }
}
