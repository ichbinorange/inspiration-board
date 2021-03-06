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
    axios.get(`${props.url}${props.board}/${props.boardName}/${props.card}`)
      .then((response) => {
        const apiCardList = response.data;
        if (apiCardList.length !== 0) {
          setCardList([...apiCardList]);
        } else {
          setCardList(apiCardList)
        }
      })
      .catch((error) => {
        // Still need to handle errors
        setErrorMessage(error.message);
      });
  }, [props.boardName]);
  
  const addCard = (card) => {
    axios.post(`${props.url}${props.board}/${props.boardName}/${props.card}`, card)
    .then((response) => {
      // What should we do when we know the post request worked?
      const updatedData = [...cardList, response.data];
      setCardList(updatedData);
      setErrorMessage('');
    })
    .catch((error) => {
      // What should we do when we know the post request failed?
      setErrorMessage(error.message);
    });
  }

  const deleteCard = (id) => {
    const newCardList = cardList.filter((card) => {
      return card.card.id !== id;
    });

    if (newCardList.length < cardList.length) {
      axios.delete(`${props.url}${props.card}/${id}`)
        .then((response) => {
          setErrorMessage(`Card ${ id } deleted`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete student ${ id }`);
        })
      setCardList(newCardList);
    }
  }
  
  const cardComponents = cardList.map((card) => {
    return (
      <Card
        key={card.card.id}
        id={card.card.id}
        text={card.card.text}
        emoji={card.card.emoji}
        deleteCardCallback={deleteCard}
      />
    )
  })
  return (
    <div data-testid={props.boardName}>
      <NewCardForm addCardCallback={addCard} /> 
      <div className="validation-errors-display">
        <h2 className="validation-errors-display__list">
          {errorMessage ? `${errorMessage}` : ''}
        </h2>
      </div>
      <div className="board">
        {cardComponents}
      </div>
    </div>
  )
};
Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(
    { card: {
        text: PropTypes.string.isRequired,
        emoji: PropTypes.string,
        id: PropTypes.number.isRequired,
      }
    },
  )),
};

export default Board;
