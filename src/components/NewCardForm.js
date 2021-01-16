import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

const NewCardForm = (props) => {
  const [formFields, setFormFields] = useState({
    text: '',
    emoji: '',
  })

  // event handlers
  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    }
    newFormFields[event.target.name] = event.target.value;
    newFormFields.emoji = emoji.getName(newFormFields.emoji)
    setFormFields(newFormFields)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.addCardCallback(formFields);

    setFormFields({
      text: '',
      emoji: '',
    })
  }

  return (
    <form
      className="new-card-form"
      onSubmit={onFormSubmit}
    >
      <h2 className="new-card-form__header">Add a New Card</h2>
      <div className="new-card-form__form">
        <label className="new-card-form__form-label">Text:</label>
        <textarea id="text"
                  name="text"
                  onChange={onInputChange}
                  value={formFields.text}
                  className="new-card-form__form-textarea" 
                  placeholder="Hello there, please put some text in this text area"
                  ></textarea>
        
        <label className="new-card-form__form-label">Emoji:</label>
        <select className="new-card-form__form-select"
                name="emoji"
                onChange={onInputChange} 
                >
          {
            EMOJI_LIST.map((ej, i) => (
              <option key={i}
                      value={ej.emoji} 
                      >{emoji.getUnicode(ej)}</option>
            ))
          }
        </select>

        <input
          type="submit"
          value="Add Card"
          className="new-card-form__form-button"
        />
      </div>
    </form>
  )
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;