import { Game } from "./index";

export interface RenderEngine {

    init(game: Game);

    render(game: Game);
}
