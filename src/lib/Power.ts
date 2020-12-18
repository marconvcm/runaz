import { Orientation } from "./Orientation";


export class Power {

    get type() { return this._orientation; }

    get amount() { return this._amount; }

    constructor(
        private _orientation: Orientation,
        private _amount: number
    ) { }

    static parse(input: String): Power {
        return new Power(
            <Orientation>input.charAt(0),
            parseInt(input.charAt(1))
        );
    }
}
