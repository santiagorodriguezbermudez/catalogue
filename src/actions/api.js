import axios from 'axios';
import {
  REACT_APP_API_URL,
  REACT_APP_API_KEY,
  mockStocks,
} from '../constants/constants';
import { fetchStocks, showStock } from './index';

// Mock API for not triggering API testing calls
export const fetchMockStocks = () => dispatch => {
  dispatch(fetchStocks(mockStocks));
};

const convertSymbolsArrayToString = symbolsArray => (
  symbolsArray.length === 0 ? '' : symbolsArray.reduce((stringSymbols, symbol) => `${stringSymbols},${symbol}`)
);

export const fetchStockProfiles = stockName => (dispatch => {
  axios({
    method: 'GET',
    url: `${REACT_APP_API_URL}/profile/${stockName}`,
    params: {
      apikey: REACT_APP_API_KEY,
    },
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    // Check if its one profile or several.
    if (response.data.length <= 1) {
      dispatch(showStock(response.data[0]));
    } else {
      dispatch(fetchStocks(response.data));
    }
  }).catch(error => {
    console.log(`We have an error when fetching profiles ${error}`);
    dispatch(fetchStocks([]));
  });
});

export const searchStocksAPI = (query, limit = 10) => (
  dispatch => {
    axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/search`,
      params: {
        apikey: REACT_APP_API_KEY,
        query: query || '',
        limit: limit.toString(),
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const stockSymbolsArray = response.data.map(stock => stock.symbol);
      dispatch(fetchStockProfiles(convertSymbolsArrayToString(stockSymbolsArray)));
    }).catch(error => {
      console.log(`We got this error on search: ${error}`);
    });
  }
);