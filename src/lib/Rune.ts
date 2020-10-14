import { RuneType } from "./RuneType";

export class Rune {

    get type() { return this._runeType; }

    get power() { return this._power; }

    constructor(
        private _runeType: RuneType,
        private _power: number
    ) { }

    static parse(input: String): Rune {
        const [type, power] = input.split('');
        return new Rune(<RuneType>type, parseInt(power));
    }

    isEqualTo(rune: Rune) {
        return this._power == rune._power && this._runeType == rune._runeType;
    }

    isSameType(rune: Rune): Boolean {
        if (this.type == RuneType.Any) { return true; }
        return this.type == rune.type;
    }
}
