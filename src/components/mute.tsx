import * as React from 'react';

export class Mute extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
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
            mute: !this.state.play
        });
    }
    render() {
        const InstrumentStyle = {
            cursor: 'pointer',
            fontSize: '0.5em',
            backgroundColor: this.state.playing ? '#2AC7DC' : '#696969',
            color: 'white',
            marginLeft: '2px',
            marginTop: '2px',
            width: '80px',
            height: '2.0em',
            borderRadius: '10px',
        }
        return (
            <button style={InstrumentStyle} onClick={this.handleClick}>
                {this.state.playing ? 'Mute' : 'Play'}
                {/* // Vietoj sito buttono ideti styled mute unmute icon */}
            </button>
        );
    }
}