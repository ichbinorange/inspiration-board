import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  const [cardList, setCardList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    axios.get(`${props.url}/${props.boardName}/cards`)
      .then((response) => {
        const apiCardList = response.data;
        setCardList(apiCardList);
      })
      .catch((error) => {
        // Still need to handle errors
        setErrorMessage(error.message);
      });
  }, []);

  const cardComponents = cardList.map((card, i) => {
    return (
      <div key={i}>
        {errorMessage ? <div><h2 className="validation-errors-display">{errorMessage}</h2></div> : <div><h2 className="validation-errors-display__list">''</h2></div>}
        <Card
          text={card.card.text}
          emoji={card.card.emoji}
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
