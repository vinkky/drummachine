import { Tone } from 'tone';

export class Kick2 {
    private ctx: AudioContext;
    private param: String;
    private gain: GainNode;
    public volume: number;
    private player: Tone.Player;
    constructor() {
        this.player = new Tone.Player("./Clap.wav");
        this.volume = 1;
    }

    setup() {
        this.player.value = 1;
        this.player.toMaster();
    }

    trigger(time: number) {
        if (this.volume === 0) { return };
        this.setup();
    }

    setVolume = (vol: number) => {
        this.volume = vol;
    }
}