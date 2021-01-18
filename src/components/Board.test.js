import React from 'react';
import axios from 'axios';
import axiosMock from 'axios'
import { render, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from "jest-fetch-mock"
import Board from './Board';
 
jest.mock('axios');

describe('Board for wave 1 and wave 2', () => {
  describe('Retrieve data from api', () => {
    test('fetches successfully data from an API', async () => {
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

      axios.get.mockImplementationOnce(() => Promise.resolve(board1));
      fetchMock.mockIf(`https://inspiration-board.herokuapp.com/boards/${url}/cards`, {
        body: board1,
        status: 200
      });
      await act(() => Promise.resolve(board1))
    });

    test('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';
    
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
    });
  })
  
  describe('Display cards after retrieving data from API', () => {
    test('fetches board from an API and displays them', async () => {
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
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: board1 })
      );

      const { getByTestId } = render(<Board
                                        url="https://inspiration-board.herokuapp.com/"
                                        board="boards" 
                                        card="cards"  
                                        boardName={url} />);
      
      // Assert
      const inspectBoard = await waitFor(() => getByTestId(`${url}`));
      expect(axiosMock.get).toHaveBeenCalledWith(`https://inspiration-board.herokuapp.com/boards/${url}/cards`)
      
      expect(inspectBoard).toHaveTextContent("OH yeah!!!");
      expect(inspectBoard).toHaveTextContent("Work!!");

      await act(() => Promise.resolve({ data: board1 }))
    });

    test('fetches board from an API and renders an empty list without crashing', async () => {
      const board2 = []
      const url = 'board2'  

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: board2 })
      );

      const { getByTestId } = render(<Board
                                        url="https://inspiration-board.herokuapp.com/"
                                        board="boards" 
                                        card="cards"  
                                        boardName={url} />);
             
      const inspectBoard = await waitFor(() => getByTestId(`${url}`));
      expect(axiosMock.get).toHaveBeenCalledWith(`https://inspiration-board.herokuapp.com/boards/${url}/cards`)
      expect(inspectBoard).not.toBeNull();
      await act(() => Promise.resolve({ data: board2 }))
    })
  })  
});