import { Action } from "./Action";
import { Deck } from "./Deck";
import { Html5RenderEngine } from "./Html5RenderEngine";
import { Player } from "./Player";
import { RenderEngine } from "./RenderEngine";


const DEBUG_DECK = "R1,R1,R1,G1,G2,G3,B1,B2";
const DEBUG_COST_ACTION_1 = "R1,X2";
const DEBUG_COST_ACTION_2 = "R1,G1,B1";

const myDeck = Deck.parse(DEBUG_DECK);


const actionFireball = new Action("Fireball", DEBUG_COST_ACTION_1);
const actionUltima = new Action("Ultima", DEBUG_COST_ACTION_2);
const actionDefense = new Action("Defense", "X1");

const player = new Player("John Doe", myDeck, [actionDefense, actionFireball, actionUltima]);

export class Game {

    constructor(
        public player: Player, 
        private renderEngine: RenderEngine
    ) {}

    init() {
        this.player.shuffle();
        this.player.draw(4);
        // this.renderEngine.init(this);
        // this.renderEngine.render(this);
    }
}

const game = new Game(player, new Html5RenderEngine(window));
window['game'] = game;
game.init();