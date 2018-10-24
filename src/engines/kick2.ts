import { Tone } from "tone";

export class Kick2 {
    public volume: number;
    private ctx: AudioContext;
    private param: string;
    private gain: GainNode;
    private player: Tone.Player;
    constructor() {
        this.player = new Tone.Player("./Clap.wav");
        this.volume = 1;
    }

    public setup() {
        this.player.value = 1;
        this.player.toMaster();
    }

    public trigger() {
        if (this.volume === 0) { return; }
        this.setup();
    }

    public setVolume = (vol: number) => {
        this.volume = vol;
    }
}
