import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Board from './Board';
import NewCardForm from './NewCardForm';

jest.mock('axios');

describe('Wave 3: NewCardForm', () => {
  test('clicking on the button with text "Add Card" the form will call the callback function', () => {
    // Arrange
    const callBackFunction = jest.fn();
    render(<NewCardForm addCardCallback={callBackFunction} />);

    // Act
    const submitBtn = screen.getByText(/Add Card/i);
    userEvent.click(submitBtn);

    // Assert
    expect(callBackFunction).toHaveBeenCalled();
  });

  test('can add a card to Board thru API', async () => {
    // Arrange
    const board1 = [
      {
        "card": {
          "id": 1,
          "text": "OH yeah!!!",
          "emoji": "heart_eyes_cat"
        }
      }
    ];
    const url = 'board1'  

    // Act
    // Load the cards on a board
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: board1 })
    );
    const { getByTestId } = render(<Board
                                      url="https://inspiration-board.herokuapp.com/"
                                      board="boards" 
                                      card="cards"  
                                      boardName={url} />);
    await waitFor(() => getByTestId(`${url}`));

    // add a card    
    const addItem = {
      "card": {
        "id": 2,
        "text": "Work!!",
        "emoji": "dog"
      }
    }      
    await axios.post.mockImplementationOnce(() => 
      Promise.resolve({ data: addItem })
    );
    userEvent.click(screen.getByText('Add Card'))
    const inspectBoard = await waitFor(() => getByTestId(`${url}`));
    
    // Assert
    expect(inspectBoard).toHaveTextContent("Work!!");
    await act(() => Promise.resolve({ data: board1 }))
  });
})
