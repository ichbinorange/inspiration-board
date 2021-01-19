import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Search.css';

const Search = (props) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get(`${props.url}`)
      .then((response) => {
        const boardList = response.data;
        setItems(
          boardList.map(({ board }) => ({ label: board.name, value: board.name }))
        );
        setLoading(false);
      })
      .catch((error) => {
        // Still need to handle errors
        setErrorMessage(error.message);
      });
  }, []);

  // event handlers
  const onInputChange = (event) => {
    setValue(event.currentTarget.value)
    props.chooseBoardCallback(event.currentTarget.value);
  }

  return (
    <section>
      <h2 className="search__header">Choose a Board</h2>
      <div className="search__form">
        <select disabled={loading}
                value={value}
                onChange={onInputChange}
                className="search__form-select">
          {items.map(item => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

Search.propTypes = {
  chooseBoardCallback: PropTypes.func.isRequired,
};

export default Search;