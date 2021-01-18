import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-text">{props.text}</div>
        <div className="card__content-emoji">{emoji.getUnicode(props.emoji || '')}</div>
        <button
          onClick={() => props.deleteCardCallback(props.id)}
          className="card__delete"
          data-testid={props.id}>
          Delete
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  deleteCardCallback: PropTypes.func.isRequired,
};

export default Card;
