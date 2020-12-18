import { Deck } from "./Deck";
import { Rune } from "./Rune";
import { Side } from "./Side";

export class Player {

    private hand: Array<Rune> = [];

    private selected: Rune = null;

    private _side: Side;

    constructor(
        protected name: string,
        protected deck: Deck
    ) { }

    get side() { return this._side; }

    getHand(): Array<Rune> { return this.hand; }

    getSelected(): Rune { return this.selected; }

    shuffle(): void {
        this.deck.shuffle();
    }

    draw(amount: number = 1): void {
        while (amount > 0) {
            this.hand.push(this.deck.draw());
            amount--;
        }
    }

    select(index: number): void {
        this.selected = this.hand[index];
    }

    unselect(): void {
        this.selected = undefined;
    }

    discard(input: Array<number>) {
        const tribute = input.map(i => this.hand[i]);
        for (const rune of tribute) {
            this.deck.push(rune);
        }
        let currentHand = this.hand;
        this.hand = (() => {
            input.forEach(i => {
                currentHand[i] = null;
            });
            return currentHand.filter(r => r != null);
        })();
        this.deck.shuffle();
    }
}
