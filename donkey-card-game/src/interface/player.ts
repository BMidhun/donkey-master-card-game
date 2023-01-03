import { PLAYERS } from "../enums";
import { ICard } from "./card";

export interface IPlayer {
    type: PLAYERS,
    playerHand: ICard[]
}