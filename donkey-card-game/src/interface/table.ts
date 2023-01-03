import { PLAYERS } from "../enums"
import { ICard } from "./card"

interface ITableEntity {
    player: PLAYERS,
    card: ICard
}

export type ITable = ITableEntity[];