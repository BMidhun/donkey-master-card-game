import React, { Fragment } from "react";
import { PLAYERS_ENUM } from "../enums";
import { ICard } from "../interface/card";
import { ITable } from "../interface/table";
import { getPlayerShadow } from "../utils";

interface IProps {
  table: ITable;
}

interface ITableCardProps {
  card: ICard;
  player: PLAYERS_ENUM;
}

function TableCardComponent({ card, player }: ITableCardProps) {
  return (
    <Fragment>
      <img
        src={card.imgSrc}
        alt="card.svg"
        className={`h-3/4 max-w-10 min-w-0 mx-2 p-1 rounded shadow-lg ${getPlayerShadow(
          player
        )}`}
      ></img>
    </Fragment>
  );
}

function TableComponent({ table }: IProps) {
  return (
    <div className="grow w-full max-h-32 lg:max-h-48 flex items-center flex-start shadow-md shadow-gray-700 bg-gradient-to-r from-green-600 to-green-800 my-2 rounded-lg">
      {table.map((item) => {
        const { player, card } = item;
        return (
          <TableCardComponent
            player={player}
            card={card}
            key={card.rank + card.value + card.type}
          />
        );
      })}
    </div>
  );
}

export default TableComponent;
