import * as React from 'react';

export class Mute extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            playing: true,
        }
    }

    public handleClick = () => {
        if (this.state.playing) {
            // mute
            this.props.mute();
        } else {
            // play
            this.props.play();
        }
        this.setState({
            playing: !this.state.playing
        });
    }
    render() {
        const InstrumentStyle = {
       
        }
        return (
            <button style={InstrumentStyle} onClick={this.handleClick}>
                {this.state.playing ? 'Mute' : 'Play'}
                {/* // Vietoj sito buttono ideti styled mute unmute icon */}
            </button>
        );
    }
}