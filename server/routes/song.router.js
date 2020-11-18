const express = require('express');
const router = express.Router();
const pg = require('pg');
const Pool = pg.Pool; // Class


// static content. this will be replaced with a database table
const pool = new Pool({
    database: 'jazzy_ajax', // name of our database
    host: 'localhost', // where is your database?
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000 // 10 seconds
});



router.get('/', (req, res) => {//ENTER router.ge
    console.log(`In /songs GET`);
    let sqlText = `SELECT * FROM songs ORDER BY title;`;
    pool.query(sqlText)
    .then((result)=> {
      console.log('Got back', result.rows);
      res.send(result.rows);
      })
      .catch((error)=> {
        console.log('Error from db:', error);
        res.sendStatus(500);
      })
      //res.send(songListArray);
});//EXIT router.git

router.post('/', (req, res) => {
    console.log('in router.post line 34');
    let song = req.body;
    console.log('this is our song', song);
    let sqlText = `INSERT INTO "songs" ("title", "length", "date_released")
                       VALUES ($1, $2, $3);`;
    pool.query(sqlText, [song.title, song.length, song.date_released])

    .then((responseFromDatabase) => {
        console.log(responseFromDatabase);
        // 201 means "created"
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in POST /artist ${error}`);
        res.sendStatus(500);
    });
    
});

module.exports = router;