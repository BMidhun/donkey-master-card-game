import React from 'react'
import Donkey from "../assets/icons/donkey.svg"
import Instagram from "../assets/icons/instagram.svg";
import GitHub from "../assets/icons/github.svg";

function InfoComponent() {
  return (
    <div>
        <div className='text-bold text-xl text-center flex items-center justify-center'><img src={Donkey} alt='donkey.svg' className='w-7 mx-3'></img> Donkey Master</div>
        <h3 className='text-bold text-lg my-3 underline'>Walkthrough</h3>
        <ul className='list-inside list-disc'>
            <li>Donkey Master is a card game consisting of 4 players playing with a set of 52 cards.</li>
            <li>The cards are initially shuffled and are distributed among the players. Each player will recieve a set of 13 cards at the start of the game.</li>
            <li>The card "2" of any type will have the lowest rank and the card "Ace" of any type will have the highest rank</li>
            <li>The player holding the Ace of Spade will start the game.</li>
            <li>A player will start a round by placing a card. Other players must place a card of the type placed by the first player of the round.</li>
            <li>The game will follow a circluar path to determine the player's turn. A player is only allowed to play when his turn comes up.</li>
            <li>A round completes when all players place the cards of the same type on the table.</li>
            <li>The next player to start a round is determined by the player who placed the card of highest rank or the player who got hit in the previous round.</li>
            <li>If a player doesn't hold a card of the type placed by the first player, then he can hit a player with a single card of any other type.</li>
            <li>The player who got hit must take all the cards present in the table and should start the next round.</li>
            <li>When a player runs out of cards, he will be declared as the winner.</li>
            <li>The game stops when one player holds card/s while other players are empty-handed.</li>
        </ul>
        <div className='my-4 text-center text-gray-600'>
            Developed by Midhun Baby 
        </div>
        <ul className='my-4 flex items-center justify-evenly'>
            <a href='https://www.instagram.com/b_midhun/' target={'_blank'} rel="noreferrer"><img src={Instagram} alt='insta.icon'/></a>
            <a href='https://github.com/BMidhun' target={'_blank'} rel="noreferrer"><img src={GitHub} alt="github.icon"/></a>
        </ul>
    </div>
  )
}

export default InfoComponent