import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Search from './components/Search';

const App = () => {
  const [board, setBoard] = useState('{}')
  const updateBoard = (item) => {
    setBoard(item)
  }

  return (
    <section>
      <header className="header">
        <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
        <h1 className="header__h1"><span className="header__text">You are now at {board}'s Board</span></h1>
      </header>
      <Search url="https://inspiration-board.herokuapp.com/boards" 
              chooseBoardCallback={updateBoard} />
      <Board
        url="https://inspiration-board.herokuapp.com/"
        board="boards" // for retrieving list of cards for a single board (not for delete a card)
        card="cards"   // for deleting a card
        boardName={board}
      />
    </section>
  );
};

export default App;
