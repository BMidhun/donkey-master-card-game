import { useCallback, useState } from "react";
import { PLAYERS_ENUM } from "../enums";
import { ICard } from "../interface/card";
import { IGameState, IScreenText } from "../interface/game";
import { ITable, ITableEntity } from "../interface/table";


export default function useTable(
    currentPlayOrder: PLAYERS_ENUM[],
    currentPlayerTracker: number,
    changePlayOrderTracker: (player: PLAYERS_ENUM | false) => void,
    removeCardOnDeal: (player: PLAYERS_ENUM, card: ICard) => void,
    gameState: IGameState,
    setScreenText: React.Dispatch<React.SetStateAction<IScreenText | null>>,
    addCardsOnHit: (player: PLAYERS_ENUM, cards: ICard[]) => void
) {

    const [table, setTable] = useState<ITable>([]);

    function clearTable() {
        setTable([]);
    }

    function compareTable(currentTable: ITable): ITableEntity | undefined {
        // check card's type on table. If same then return currentTable, else add logic to push the hit cards to the player who got hit.
        if (currentTable.length === 1)
            return;

        let isHit = false;
        const compareItem = currentTable[0];
        for (let item of currentTable) {
            if (item.card.type !== compareItem.card.type) {
                isHit = true;
                break;
            }
        }
        if (!isHit)
            return;

        const hitCards = currentTable.filter(item => item.card.type === compareItem.card.type);
        const sortHitCards = hitCards.sort((a, b) => b.card.rank - a.card.rank);

        return sortHitCards[0];
    }

    // const onDeal = (player: PLAYERS_ENUM, card: ICard | null) => {

    //     if (!card) {
    //         const nextPlayer = currentPlayOrder[currentPlayerTracker + 1];
    //         changePlayOrderTracker(
    //             nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
    //         );
    //         return;
    //     }

    //     let currentTable: ITable = [...table, { player, card }];
    //     removeCardOnDeal(player, card);
    //     const hit = compareTable(currentTable);

    //     if (!hit && currentTable.length < gameState.numOfAvailablePlayers) {
    //         const nextPlayer = currentPlayOrder[currentPlayerTracker + 1];
    //         changePlayOrderTracker(
    //             nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
    //         );
    //         setTable(currentTable);
    //         return;
    //     }

    //     if (!hit && currentTable.length === gameState.numOfAvailablePlayers) {
    //         setScreenText({ type: "ROUND", message: "Round Completed!" });
    //         const newRoundPlayer = [...currentTable].sort((a, b) => b.card.rank - a.card.rank)[0];
    //         changePlayOrderTracker(false);
    //         setTable(currentTable);
    //         setTimeout(() => {
    //             changePlayOrderTracker(newRoundPlayer.player);
    //             setScreenText(null);
    //             clearTable();
    //         }, 2000)

    //         return;
    //     }

    //     if (hit) {

    //         const penalties = currentTable.map(item => item.card);
    //         changePlayOrderTracker(false);
    //         addCardsOnHit(hit.player, penalties);
    //         setScreenText({ message: `${hit.player} has been hit!`, type: "HIT" })
    //         setTable(currentTable);

    //         setTimeout(() => {
    //             clearTable();
    //             setScreenText(null);
    //             changePlayOrderTracker(hit.player);
    //         }, 2000)
    //         return;
    //     }

    // }

    const onDeal = useCallback(function (player: PLAYERS_ENUM, card: ICard | null) {
        if (!card) {
            const nextPlayer = currentPlayOrder[currentPlayerTracker + 1];
            changePlayOrderTracker(
                nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
            );
            return;
        }

        let currentTable: ITable = [...table, { player, card }];
        removeCardOnDeal(player, card);
        const hit = compareTable(currentTable);

        if (!hit && currentTable.length < gameState.numOfAvailablePlayers) {
            const nextPlayer = currentPlayOrder[currentPlayerTracker + 1];
            changePlayOrderTracker(
                nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
            );
            setTable(currentTable);
            return;
        }

        if (!hit && currentTable.length === gameState.numOfAvailablePlayers) {
            setScreenText({ type: "ROUND", message: "Round Completed!" });
            const newRoundPlayer = [...currentTable].sort((a, b) => b.card.rank - a.card.rank)[0];
            changePlayOrderTracker(false);
            setTable(currentTable);
            setTimeout(() => {
                changePlayOrderTracker(newRoundPlayer.player);
                setScreenText(null);
                clearTable();
            }, 2000)

            return;
        }

        if (hit) {

            const penalties = currentTable.map(item => item.card);
            changePlayOrderTracker(false);
            addCardsOnHit(hit.player, penalties);
            setScreenText({ message: `${hit.player} has been hit!`, type: "HIT" })
            setTable(currentTable);

            setTimeout(() => {
                clearTable();
                setScreenText(null);
                changePlayOrderTracker(hit.player);
            }, 2000)
            return;
        }
    }, [currentPlayOrder,addCardsOnHit,changePlayOrderTracker,currentPlayerTracker,gameState.numOfAvailablePlayers,removeCardOnDeal,setScreenText,table])

    return { table, onDeal };
}