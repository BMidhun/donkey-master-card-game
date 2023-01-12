import { PLAYERS_ENUM } from "../enums"
import { ICard } from "./card"

interface ITableEntity {
    player: PLAYERS_ENUM,
    card: ICard
}

export type ITable = ITableEntity[];