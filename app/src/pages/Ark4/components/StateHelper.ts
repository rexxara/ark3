import { GameState } from "../GameState";

interface IGameState {
    pamy选择A: string;
}
class Fields {
    public static ARK_GAMESTATE = "ARK_GAMESTATE";
}
export default class StateHelper {
    static saveState(gameState: GameState) {
        localStorage.setItem(Fields.ARK_GAMESTATE, JSON.stringify(gameState))
    }
    public static getLocalState(): Partial<IGameState> {
        const stateStr = localStorage.getItem(Fields.ARK_GAMESTATE);
        let state: Partial<IGameState> = {};
        if (stateStr) {
            state = JSON.parse(stateStr);
        }
        return state;
    }
}