
const express = require('express');
const sqlite3 = require('sqlite3');

const app = express(); // use express for http handling 
const port = 3000; 

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

// create a database 
const db = new sqlite3.Database(':memory'); // dont save to file 

// insert state names into database 
db.serialize(() => 
    {
    db.run("CREATE TABLE states (name TEXT)");
    const stmt = db.prepare("INSERT INTO states VALUES (?)");

    // for loop to iterate over all states
    states.forEach((state) => {
        stmt.run(state);
    });
    }
);

// create a route to handle get HTTP GET requests 
app.get('/states', (request, response) => {
    db.all("SELECT * FROM states", [], (err, rows) =>{
        if (err){
            // send 500 response to show error 
            console.error(err);
            return response.status(500).json({error: 'backend error. see logs for more detail.'});
        }
        // if no error, then map name field from each row into array 
        const stateNames = rows.map(row => row.name);
        response.json(stateNames); // return json response 
    });
});

// start server
app.listen(port, () => {
    console.log('server is running on http://localhost:${port}');
});

