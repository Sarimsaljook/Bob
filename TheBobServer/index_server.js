const express = require('express');
const AWS = require('aws-sdk');
const app = express();

app.use(express.json());

// Configure AWS SDK with AWS credentials and region
AWS.config.update({ accessKeyId: 'AKIA4MY5LTISHUEZD5OB', secretAccessKey: '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', region: 'us-east-1' });

// Define DynamoDB table name
const tableName = 'Users';

// Declare Dynao DB instance
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create a new record in DynamoDB
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
      console.log('Record added successfully!');
      res.json({ success: true });
    }
  });
});

// API endpoint for user authentication
app.post('/api/authUser/', (req, res) => {
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

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
