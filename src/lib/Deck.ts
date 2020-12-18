import { Rune } from "./Rune";

export class Deck {

    constructor(private runes: Array<Rune>) { }

    runeAt(index: number): Rune {
        return this.runes[index];
    }

    static parse(input: String): Deck {
        const runes = input.split('|').map(Rune.parse);
        return new Deck(runes);
    }

    shuffle(): void {
        const _shuffle = (a) => {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i]; a[i] = a[j]; a[j] = x;
            }
            return a;
        };
        this.runes = _shuffle(this.runes);
    }

    draw(): Rune {
        return this.runes.pop();
    }

    push(rune: Rune): void {
        this.runes.push(rune);
    }
}
