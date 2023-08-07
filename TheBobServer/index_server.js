const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

// Configure AWS SDK with AWS credentials and region
AWS.config.update({ accessKeyId: 'AKIA4MY5LTISHUEZD5OB', secretAccessKey: '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', region: 'us-east-1' });

// Define DynamoDB table name
const tableName = 'Users';

// Declare Dynao DB instance
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const API_KEY = 'ZCQDT96VBC5WB0KO';
const BASE_URL = 'https://www.alphavantage.co/query';

// Add end point to Create a new record in DynamoDB
app.post('/api/addUser', (req, res) => {
  const { Name, Username, Password, PreferredTradingStyle, GeneralInvestmentSector } = req.body;

  const params = {
    TableName: tableName,
    Item: {
      Name,
      Username,
      Password,
      PreferredTradingStyle,
      GeneralInvestmentSector,
    },
  };

  dynamoDB.put(params, (error) => {
    if (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ error: 'Failed to add record to DynamoDB' });
    } else {
      console.log('User Record added successfully!');
      res.json({ success: true });
    }
  });
});

// API endpoint for user authentication
app.post('/api/authUser', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    var params = {
        TableName: tableName,
        Key: {
          'Username': username
        },
        ProjectionExpression: 'Username, Password'
      };

      try {
      // Call DynamoDB to read the item from the table
      dynamoDB.get(params, function(err, data) {
       if(data.Item) { 
        if (err) {
           res.send({ "Error" : err });
          } else {
            console.log(data.Item);
            if (data.Item.Password == password && data.Item.Username == username) { 
               res.send({ "result" : "User Found Successfully!" });
            } else {
               res.send({ "result" : "Invalid Username or Password" });
            } 
        }
    } else { res.send({ "result" : "Invalid Username or Password" }) }
      });
    } catch(err) {
        res.send({ "Error" : err });
        console.log(err);
    }
  });

  // Get Investment preferences end point
app.post('/api/getInvestmentPrefferences', (req, res) => {
  const { username } = req.body;
  
  // Check if username and password are provided
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  var params = {
      TableName: tableName,
      Key: {
        'Username': username
      },
      ProjectionExpression: 'GeneralInvestmentSector, PreferredTradingStyle'
    };

    try {
    // Call DynamoDB to read the item from the table
    dynamoDB.get(params, function(err, data) {
     if(data.Item) { 
      if (err) {
         res.send({ "Error" : err });
        } else {
          console.log(data.Item);
          res.send(data.Item);
         
      }
  } else { res.send({ "result" : "Invalid Username" }) }
    });
  } catch(err) {
      res.send({ "Error" : err });
      console.log(err);
  }
});

// STOCK RANKER LOGIC

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
      }
    } catch (error) {
      return null; // Return null if there's an error fetching data for the symbol
    }
  }

app.get('/api/getBestToInvest', async (req, res) => { 
  try {
    // Fetch all available stock tickers
    const symbols = await getAllStockTickers();

    console.log(symbols);

    // Fetch stock data for all tickers concurrently
    const stockDataPromises = symbols.map((symbol) => getStockData(symbol));
    const stockDataResults = await Promise.all(stockDataPromises);
  
    // Filter out null values (skipped stocks) from the results
    const stockData = stockDataResults.filter((data) => data !== null);

    // Sort the stocks in descending order based on percent change
    stockData.sort((a, b) => b.percentChange - a.percentChange);

    const finalTop5List = [];

    // Display the top 5 ranked stocks based on percent change
    console.log('Top 5 stocks based on percent change:');
    for (let i = 0; i < 5; i++) {
      finalTop5List.push(stockData[i].symbol);
      console.log(
        `${i + 1}. ${stockData[i].symbol} - ${stockData[i].percentChange.toFixed(2)}%`
      );
    }
    
    res.send(finalTop5List);

  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
