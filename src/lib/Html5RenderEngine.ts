import { hasOwnMetadata } from "core-js/fn/reflect";
import { Action } from "./Action";
import { Game } from "./index";
import { Player } from "./Player";
import { RenderEngine } from "./RenderEngine";
import { Rune } from "./Rune";
import { RuneType } from "./RuneType";

export class Html5RenderEngine implements RenderEngine {

    handSlot: HTMLDivElement;
    actionList: HTMLDivElement;
    drawButton: HTMLButtonElement;

    constructor(private root: Window) { }

    init(game: Game) {
        this.handSlot = this.$element(".hand .slot");
        this.actionList = this.$element(".action-list");
        this.drawButton = this.$element(".draw-button");

        this.setupAction(game);
    }

    setupAction(game: Game) {
        this.drawButton.onclick = () => {
            game.player.draw();
            this.render(game);
        }
    }

    render(game: Game) {
        this.renderHand(game);
        this.renderActions(game);
    }

    renderHand(game: Game) {
        const hand = game.player.getHand();
        this.handSlot.innerHTML = "";
        for (const rune of hand) {
            const viewModel = new RuneViewModel(rune);
            this.handSlot.innerHTML += viewModel.html();
        }
        this.applyHandListener(game);
    }

    applyHandListener(game: Game) {
        const runes = this.handSlot.querySelectorAll('.rune');
        runes.forEach((rune, index) => {
            rune.addEventListener('click', () => {
                game.player.select(index);
                this.render(game);
            }, false);
        });
    }

    renderActions(game: Game) {
        const actions = game.player.getActions();
        this.actionList.innerHTML = "";
        for (const action of actions) {
            const viewModel = new ActionViewModel(action, game.player);
            this.actionList.innerHTML += viewModel.html();
        }
        this.applyActionListener(game);
    }

    applyActionListener(game: Game) {
        const buttons = this.actionList.querySelectorAll('.drop');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                game.player.pushAction(index, game.player.getSelected());
                game.player.unselect();
                console.log(game.player);
                this.render(game);
            }, false);
        });
    }

    renderAction(action: Action) {

    }

    $element(selector) {
        return this.root.document.querySelector(selector);
    }

    $all(selector) {
        return this.root.document.querySelectorAll(selector);
    }
}


class ActionViewModel {

    constructor(private action: Action, private player: Player) { }

    html() {
        console.log(1);
        return `<div class="action">
        <span>${this.action.label}</span>
        <div class="slot">
            <div class="tribute">
                ${this.tributes()}
            </div>
        </div>
        <button class='invoke'>invoke</button>
        ${this.drop()}
        </div>`;
    }

    private drop(): string {
        if (this.player.getSelected()) { return "<button class='drop'>drop</button>"; }
        return "";
    }

    private tributes(): string {
        return this.action.breakdown.map(rune => new RuneViewModel(rune)).reduce((last, next) => {
            return last + next.html();
        }, "");
    }
}

class RuneViewModel {

    constructor(private rune: Rune) { }

    html() {
        switch (this.rune.type) {
            case RuneType.Red: return `<div draggable="true" class="rune sprite-rune-5-12"> <div class="power">${this.rune.power}</div></div>`;
            case RuneType.Green: return `<div draggable="true" class="rune sprite-rune-11-12"> <div class="power">${this.rune.power}</div></div>`;
            case RuneType.Blue: return `<div draggable="true" class="rune sprite-rune-8-12"> <div class="power">${this.rune.power}</div></div>`;
            case RuneType.Yellow: return `<div draggable="true" class="rune sprite-rune-0-12"> <div class="power">${this.rune.power}</div></div>`;
            case RuneType.Any: return `<div draggable="true" class="rune sprite-rune-1-12"> <div class="power">${this.rune.power}</div></div>`;
        };
    }
}