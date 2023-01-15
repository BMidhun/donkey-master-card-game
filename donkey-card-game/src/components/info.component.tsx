function InfoComponent() {
  return (
    <div>
        <div className='text-bold text-xl text-center flex items-center justify-center'>
          <img src="/assets/icons/donkey.svg" alt='donkey.svg' className='w-7 mx-3'></img> Donkey Master</div>
        <h3 className='text-bold text-lg my-3 underline'>Game Walkthrough</h3>
        <ul className='list-inside list-disc'>
            <li>Donkey Master is a card game for four players that uses a deck of 52 cards.</li>
            <li>Initially, the cards are shuffled and distributed among the players. At the start of the game, each player will be given a set of 13 cards.</li>
            <li>The lowest rank is a card of "2" of any type, and the highest rank is a card of "Ace" of any type.</li>
            <li>The game will begin with the player holding the Ace of Spades.</li>
            <li>A round will begin when a player places a card. Other players must place a card of the same type as the round's first player.</li>
            <li>The game follows a circular path to determine the player's turn. Players can only play when it is their turn.</li>
            <li>The round ends when all players put the cards of same type on the table or when one player hits another.</li>
            <li>A player can only hit another player if they do not have cards of the type placed on the table. The player who placed the highest ranked card before the hit must collect all cards from the table after the hit.</li>
            <li>The next player to start the round is determined by the player who placed the highest ranked card or got hit in the previous round.</li>
            <li>If a player goes empty-handed after completing a round, that player is declared the winner.</li>
            <li>The game ends when one player has card/s and the other players have no cards.</li>
            <li>You can refresh the window to start a new game.</li>
        </ul>
        <p className='my-4 text-center text-gray-600'>
            Developed by Midhun Baby 
        </p>
        <ul className='my-4 flex items-center justify-evenly'>
            <a href='https://www.instagram.com/b_midhun/' target={'_blank'} rel="noreferrer"><img src="/assets/icons/instagram.svg" alt='insta.icon'/></a>
            <a href='https://github.com/BMidhun' target={'_blank'} rel="noreferrer"><img src="/assets/icons/github.svg" alt="github.icon"/></a>
        </ul>
    </div>
  )
}

export default InfoComponent