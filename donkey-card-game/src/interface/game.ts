import { PLAYERS_ENUM } from "../enums";

export interface IGameState {
    numOfAvailablePlayers: number,
    winners: {
        [PLAYERS_ENUM.HUMAN] : boolean,
        [PLAYERS_ENUM.COM1] : boolean,
        [PLAYERS_ENUM.COM2] : boolean,
        [PLAYERS_ENUM.COM3] : boolean,
    } 
}

export interface IScreenText {
    type: "HIT" | "ROUND",
    message: string
}