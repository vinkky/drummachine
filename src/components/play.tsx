import * as React from 'react';

export class PlayPause extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
        }
    }

    public handleClick = () => {
        if (this.state.playing) {
            this.props.pause();
        } else {
            this.props.play();
        }
        this.setState({
            playing: !this.state.playing
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
                {this.state.playing ? 'Pause' : 'Play'}
            </button>
        );
    }
}