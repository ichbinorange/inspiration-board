import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const Board = (props) => {
  const cardComponents = CARD_DATA.cards.map((card, i) => {
    return (
      <div key={i}>
        <Card
          text={card.text}
          emoji={card.emoji}
          Emoji={card.Emoji}
          deleteCardCallback={props.deleteCardCallback}
        />
      </div>
    )
  })
  return (
    <div className="board">
      {cardComponents}
    </div>
  )
};
Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(
    {
      quote: PropTypes.string.isRequired,
      emoji: PropTypes.string,
      id: PropTypes.number.isRequired,
    },
  )),
  deleteCardCallback: PropTypes.func.isRequired,
};

export default Board;
