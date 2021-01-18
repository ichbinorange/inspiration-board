import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Board from './Board';
import Card from './Card';

jest.mock('axios');

describe('Card', () => {
  describe('wave 1: display the card', () => {
    beforeEach(() => {
      render(<Card
              id="1"
              text="Hello World"
              emoji="heart_eyes"
              deleteCardCallback={() => { }}
          />);  
    });

    test('that it will display the text', async () => {
      expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    });

    test('that it will display the emoji', async () => {
      expect(screen.getByText('😍')).toBeInTheDocument();
    });
  })

  describe('wave 3: delete the card', () => {
    test('clicking on the button with text "Delete" the form will call the callback function', () => {
      // Arrange
      const callBackFunction = jest.fn();
      render(<Card
                id="1"
                text="Hello World"
                emoji="heart_eyes"
                deleteCardCallback={callBackFunction}
            />);

      // Act
      const submitBtn = screen.getByText(/Delete/i);
      userEvent.click(submitBtn);
  
      // Assert
      expect(callBackFunction).toHaveBeenCalled();
    });

    test('can delete a card thru API', async () => {
      // Arrange
      const board1 = [
        {
          "card": {
            "id": 1,
            "text": "OH yeah!!!",
            "emoji": "heart_eyes_cat"
          }
        },
        {
          "card": {
            "id": 2,
            "text": "Work!!",
            "emoji": "dog"
          }
        },
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

      // delete the card with button's data-testid = 1     
      const deleteItem = [{
        "card": {
          "id": 1,
          "text": "OH yeah!!!",
          "emoji": "heart_eyes_cat"
        }
      }]        
      await axios.delete.mockImplementationOnce(() => 
        Promise.resolve({ data: {hit: deleteItem} })
      );
      userEvent.click(screen.getByTestId('1'))
      const inspectBoard = await waitFor(() => getByTestId(`${url}`));

      // Assert
      expect(inspectBoard).not.toHaveTextContent("OH yeah!!!");
      await act(() => Promise.resolve({ data: board1 }))
    });
  })
});