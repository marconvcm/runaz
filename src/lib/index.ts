import { Board, Match } from "./Board";
import { Deck } from "./Deck";
import { Player } from "./Player";

const deck1 = Deck.parse("R-W9,S8,E1,N2|X-W9,S8,E1,N2");
const deck2 = Deck.parse("R-W9,S8,E1,N2|B-W9,S8,E1,N2");

const player1 = new Player("John Doe", deck1);
const player2 = new Player("Mary Doe", deck2);

const board = new Board();

const match = new Match(board);

window['game'] = { 
    deck1, 
    deck2, 
    player1, 
    player2, 
    board, 
    match 
};
