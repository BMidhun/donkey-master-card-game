import { CARD_TYPE_ENUM, PLAYERS } from "../enums";
import { ICard, ICardSet } from "./card";

export interface IPlayerState {
    [PLAYERS.HUMAN]: ICardSet,
    [PLAYERS.COM1]: ICardSet,
    [PLAYERS.COM2]: ICardSet,
    [PLAYERS.COM3]: ICardSet
}