import { Action } from "./Action";
import { ActionResult } from "./ActionResult";
import { Deck } from "./Deck";
import { Rune } from "./Rune";

export class Player {

  private hand: Array<Rune> = [];

  private selected: Rune = null;

  constructor(
    protected name: string,
    protected deck: Deck,
    protected actions: Array<Action>
  ) { }

  getHand(): Array<Rune> { return this.hand; }

  getActions(): Array<Action> { return this.actions; }

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

  invoke(action: number, input: Array<number>): ActionResult {
    const self = this;
    const tribute = input.map(i => this.hand[i]);
    const result = this.actions[action].invoke(tribute);
    return {
      run(target: Player) {
        if (result) {
          result.run(target);
          self.discard(input);
        }
      }
    }
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
