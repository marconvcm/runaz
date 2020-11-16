import { Rune } from "./Rune";
import { shuffle } from "./utils";
export class Deck {

  constructor(private runes: Array<Rune>) { }

  runeAt(index: number): Rune {
    return this.runes[index];
  }

  static parse(input: String): Deck {
    const runes = input.split(',').map(Rune.parse);
    return new Deck(runes);
  }

  shuffle(): void {
    this.runes = shuffle(this.runes);
  }

  draw(): Rune {
    return this.runes.pop();
  }

  push(rune: Rune): void {
    this.runes.push(rune);
  }
}
