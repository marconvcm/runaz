import { Observable } from "./other/Observable";
import { Player } from "./Player";
import { Rune } from "./Rune";
import { Side } from "./Side";

export class Slot {

    private _side: Observable<Side> = new Observable(null);

    public get owner() { return this._owner; }
    public get rune() { return this._rune; }
    public get side() { return this._side; }
    
    constructor(
        private _owner: Player,
        private _rune: Rune,
        _side: Side
    ) {
        this._side.value = _side;
    }

    flip(): void {
        this._side.value = this._side.value == Side.Dark ? Side.Light : Side.Dark;
    }
}

export class Board {
 
    public get last(): Observable<Slot> { return this._last; }

    private _last: Observable<Slot> = new Observable(null);
    
    private _slots = new Observable<Slot[]>(
        [null, null, null,
         null, null, null, 
         null, null, null]
    )

    place(owner: Player, rune: Rune, position: number) {
        const slot = new Slot(owner, rune, owner.side);
        this._slots.value[position] = slot;
        this._slots.notify();
        this._last.value = slot;
    }
}

export class Match {

    constructor(
        private board: Board
    ) { }

    init() {
        this.board.last.add(this.placed);
    }

    placed(value: Slot): void {
        value.side.add(this.fliped);
    }

    fliped(value: Side): void {

    }
}
