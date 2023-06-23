tableName = process.env.tableName;
aws_region = process.env.aws_region;

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

// import the aws sdk to use the dynamodb
// libraries in the app
const AWS = require('aws-sdk');

// update the region to 
// where dynamodb is hosted
AWS.config.update({ region: aws_region });

// create a new dynamodb client
// which provides connectivity b/w the app
// and the db instance
const client = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.json());

app.get("/", (req, res) => {

    console.log(`reading data from:  ${tableName} in ${aws_region}`);
    res.contentType = 'application/json';
    res.send("welcome to the demo API for reading/writing data from DynamoDB!");
});


app.get("/rows/all", (req, res) => {
    var params = {
        TableName: tableName
    };
    console.log(`reading data from:  ${tableName} in ${aws_region}`);
    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]['Name']);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
});

app.post("/rows/add", (req, res) => {
    var body = req.body;
    var params = {
        TableName: tableName,
        Item: {
            "Id": uuidv4(),
            "Name": body["name"]
        }
    };
    console.log(`inserting data into:  ${tableName} in ${aws_region}`);
    client.put(params, (err, data) => {
        var status = {};
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            status["success"] = false;
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            status["success"] = true;
        }
        res.contentType = "application/json";
        res.send(status);
    });
});

app.listen(port, () => {
    //tableName = process.env.tableName;
    //aws_region = process.env.aws_region;
    console.log(`Listening on port ${port}`);
    console.log(`connecting db from:  ${tableName} in ${aws_region}`);
})