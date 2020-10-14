import { ActionResult } from "./ActionResult";
import { Player } from "./Player";
import { Rune } from "./Rune";

export class Action {

    public breakdown: Array<Rune> = [];

    get label() { return this._label; }

    constructor(private _label: String, private cost: String, private actionResult: ActionResult) {
        this.breakdown = cost.split(',').map(Rune.parse);
    }

    invoke(tribute: Array<Rune>): ActionResult {
        const result = this.breakdown.map(rune => this.collect(rune, tribute));

        for (const bool of result) {
            if (!bool) {
                return undefined;
            }
        }

        const self = this;

        return {
            run(target: Player) {
                console.log("Using: " + self._label);
                self.actionResult.run(target);
            }
        };
    }

    collect(cost: Rune, tribute: Array<Rune>): Boolean {
        return tribute
            .filter(t => cost.isSameType(t))
            .reduce((l, c) => l + c.power, 0) >= cost.power;
    }
}
