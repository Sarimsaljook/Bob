const axios = require('axios');

const API_KEY = '';
const BASE_URL = 'https://www.alphavantage.co/query';

// Step 1: Fetch all stock tickers using Alpha Vantage API
async function getAllStockTickers() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'LISTING_STATUS',
          apikey: API_KEY,
        },
      });
  
      const { data } = response;
      const lines = data.split('\n');
  
      // Initialize an array to store tickers
      const tickers = [];
  
      // Start from index 1 to skip the column names in the first row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        const ticker = line.split(',')[0]; // Assuming ticker is the first part of each row
        if (ticker) {
          tickers.push(ticker);
        }
      }
  
      return tickers;

    } catch (error) {
      console.log(error);
    }
  }
  
  // Step 2: Fetch stock data for a given symbol using Alpha Vantage API
  async function getStockData(symbol) {
    try {
      // Check if the symbol is a string before making the API call
      if (typeof symbol !== 'string') {
        throw new Error(`Invalid stock symbol: ${symbol}`);
      }
  
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY,
        },
      });
  
      const { data } = response;
      if (data['Global Quote']) {
          const price = parseFloat(data['Global Quote']['05. price']);
          const previousClose = parseFloat(data['Global Quote']['08. previous close']);
          const percentChange = parseFloat(data['Global Quote']['10. change percent']);
        return {
          symbol: data['Global Quote']['01. symbol'],
          price: price,
          previousClose: previousClose,
          percentChange: percentChange,
        };
      } else {
        throw new Error(`Invalid response data for ${symbol}`);
      }
    } catch (error) {
      if (error.message.includes('Invalid response data')) {
        console.error(`Error fetching stock data for ${symbol}: Invalid response data`);
      } else {
        console.error(`Error fetching stock data for ${symbol}: ${error.message}`);
      }
      return null; // Return null if there's an error fetching data for the symbol
    }
  }
  
  
  // Step 3: Main function to fetch stock data for all tickers, calculate percent change, and rank the top 5
  async function main() {
    try {
      // Fetch all available stock tickers
      const symbols = await getAllStockTickers();

      console.log(symbols);
  
      // Fetch stock data for all tickers concurrently
      const stockDataPromises = symbols.map((symbol) => getStockData(symbol));
      const stockData = await Promise.all(stockDataPromises);

      // Sort the stocks in descending order based on percent change
      stockData.sort((a, b) => b.percentChange - a.percentChange);
  
      // Display the top 5 ranked stocks based on percent change
      console.log('Top 5 stocks based on percent change:');
      for (let i = 0; i < 5; i++) {
        console.log(
          `${i + 1}. ${stockData[i].symbol} - ${stockData[i].percentChange.toFixed(2)}%`
        );
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  // Call the main function to start the process
  main();