import { useState } from "react";
import { ICard } from "../../interface/card";

interface IProps {
    initialHand: ICard[];
    isCurrentPlayer: boolean;
}

function ComputerContainer({ initialHand, isCurrentPlayer }: IProps) {
    const [playerCards, setPlayerCards] = useState<ICard[]>(initialHand);
    return (
        <div>ComputerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
    )
}

export default ComputerContainer