import React from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  return (
    <section>
      <header className="header">
        <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
      </header>
      <Board
        url="https://inspiration-board.herokuapp.com/"
        board="boards" // for retrieve list of cards for a single board (not for delete a card)
        card="cards"   // for delete a card
        boardName={`Ting-Yi`}
      />
    </section>
  );
};

export default App;
