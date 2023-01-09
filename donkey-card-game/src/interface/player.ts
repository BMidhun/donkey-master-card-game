import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard, ICardSet } from "./card";

export interface IPlayerState {
    [PLAYERS_ENUM.HUMAN]: ICardSet,
    [PLAYERS_ENUM.COM1]: ICardSet,
    [PLAYERS_ENUM.COM2]: ICardSet,
    [PLAYERS_ENUM.COM3]: ICardSet
}