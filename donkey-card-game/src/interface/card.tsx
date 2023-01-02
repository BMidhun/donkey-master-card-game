import Module from "module";
import { CARD_TYPE_ENUM, CARD_VALUES_ENUM } from "../enums";

export interface ICard {
    type: CARD_TYPE_ENUM,
    imgSrc?: {default:string},
    value: CARD_VALUES_ENUM,
    rank: number
}
