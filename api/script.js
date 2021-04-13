const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());


//MySQL details
var mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'saivikas',
password: 'saivikas',
database: 'assignment',
multipleStatements: true
});


mysqlConnection.connect((err)=> {
if(!err)
console.log('Connection Established Successfully');
else
console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the randam data details from the MySQL Database
app.get('/randoms' , (req, res) => {
console.log("req",req);
mysqlConnection.query('SELECT * FROM randoms limit ? offset ?',[ Number(req.query.limit), Number(req.query.offset) ], (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );

