import { InstrumentEngine } from "./engines";

export class Snare implements InstrumentEngine {
    public tone: number;
    public decay: number;
    public volume: number;
    private ctx: AudioContext;
    private noise: AudioBufferSourceNode;
    private noiseEnvelope: GainNode;
    private osc: OscillatorNode;
    private oscEnvelope: GainNode;
    constructor(ctx) {
        this.ctx = ctx;
        this.tone = 100;
        this.decay = 0.2;
        this.volume = 1;
    }

    public setup() {
        this.noise = this.ctx.createBufferSource();
        this.noise.buffer = this.noiseBuffer();

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.value = 1000;
        this.noise.connect(noiseFilter);

        this.noiseEnvelope = this.ctx.createGain();
        noiseFilter.connect(this.noiseEnvelope);

        this.noiseEnvelope.connect(this.ctx.destination);

        this.osc = this.ctx.createOscillator();
        this.osc.type = "triangle";

        this.oscEnvelope = this.ctx.createGain();
        this.osc.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.ctx.destination);
    }

    public noiseBuffer() {
        const bufferSize = this.ctx.sampleRate;
        const  buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    public trigger(time: number) {
        if (this.volume === 0) { return; }
        this.setup();
        this.noiseEnvelope.gain.setValueAtTime(this.volume, time);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + this.decay);
        this.noise.start(time);

        this.osc.frequency.setValueAtTime(this.tone, time);
        this.oscEnvelope.gain.setValueAtTime(0.7 * this.volume, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01 * this.volume, time + this.decay / 2);
        this.osc.start(time);

        this.osc.stop(time + this.decay);
        this.noise.stop(time + this.decay);
    }

    public setTone = (tone: number) => {
        this.tone = tone;
    }
    public setDecay = (decay: number) => {
        this.tone = decay;
    }
    public setVolume = (vol: number) => {
        this.volume = vol;
    }
}
