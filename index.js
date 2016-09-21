var mysql = require('mysql');

// Server configuration, make sure this is set up correctly.
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'intro_to_sql'
});


// if you want to be brave and use promises instead of callbacks
function queryPromise(query) {
  return new Promise(function(resolve, reject) {
    connection.query(query, function(err, rows, fields) {
      if (err) reject(err);
      resolve({ fields: fields, rows: rows });
    });
  })
}


// connects to the server
connection.connect();

// Performs an SQL query
// connection.query(`query string`, function (err, rows, fields) {
// // check for the error
// // then do things with the rows and fields
// });


// this query will just select the result of the expression `1+1` and return it in the
// field called `solution`
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  // this should be pretty self explanitory if you're familiar with callbacks
  // just know that this function will execute whenever we actually receive the
  // data from the database

  // if the query provided the error parameter, throw it as an error, because
  // that means something bad happened
  if (err) throw err;

  // `fields` is just an array...of objects that represent the fields in the result
  console.log('Fields: ', fields); // => [ { ...A TON OF PROPERTIES... } ]

  // That thing above probably looks scary, but it's just an array,
  // so we can map it... just like a normal array
  console.log('Field names: ', fields.map(field => field.name)); // => ['solution']

  // this would log an array with one element that is an object...
  console.log('Rows: ', rows); // => [ { solution: 2 } ]

  // but since all we want is the solution....
  console.log('Solution: ', rows[0].solution);
});



// Here is an alternative to the above, using a promise.
queryPromise('SELECT 1 + 1 AS solution').then(function(data) {
  console.log('Fields: ', data.fields); // => [ { ...A TON OF PROPERTIES... } ]

  // That thing above probably looks scary, but it's just an array,
  // so we can map it... just like a normal array
  console.log('Field names: ', data.fields.map(field => field.name)); // => ['solution']
  console.log('Rows: ', data.rows); // => [ { solution: 2 } ]
  console.log('Solution: ', data.rows[0].solution);
}).catch(function(err) {
  throw err;
})



// This one will select all of the items in our `players` table
connection.query('SELECT * FROM players', function(err, rows, fields) {
  // check for the error, just like before
  if (err) throw err;

  // Just like before, this is probably scary
  console.log('Fields: ', fields); // => [ { ...A TON OF PROPERTIES... }, {...} ]

  // However, also like before, it's a normal array.
  console.log('Field names: ', fields.map(field => field.name)); // => ['id', 'name']

  // this would log an array of objects from the result
  // which we can actually use to do stuff with.
  console.log('Players: ', rows); // => [ { id: 10, name: 'Alice' }, {...}, ... ]

  // And just like before, we can map it or access a specific record.
  console.log('Names: ', rows.map(player => player.name)) // => [ 'Alice', 'Bob', ... ]
});

// Here we get into filtering. The where clause acts really similarly to the
// `.filter()` function on an array. It will on;y include records where that's true
// Try playing around with this one on the other tables
connection.query('SELECT * FROM players WHERE players.id = 10', function(err, rows, fields) {
  if (err) throw err;

  console.log('Fields: ', fields.map(field => field.name)); // => [ 'id', 'name' ]

  // This should only have one result, so we can just access index 0 for our object
  console.log('Player: ', rows[0]); // => { id: 10, name: 'Alice' }
});


// Here is where things get interesting. just know the the ` -- ` in the query is a comment.
// These should be safe to run.
connection.query(`
  SELECT players.id as playerId       -- select the player id and name it 'playerId'
        ,players.name as playerName   -- select the player name and name it 'playerName'
        ,COUNT(*) as gameCount        -- select the total number of rows for each player (defined in the GROUP BY clause)
  FROM players                        -- start with the player table
  INNER JOIN games                    -- and join it with the games table
  ON games.player1_id = players.id    -- filter the join to only include matches where our player
    OR games.player2_id = players.id  -- played in the game
  GROUP BY players.id, players.name   -- this clause tells us to aggregate the results by the player id and name
                                      -- which will give us one result per player
`, function(err, rows, fields) {
  if (err) throw err;

  console.log('Fields: ', fields.map(field => field.name)); // => [ 'playerId', 'playerName', 'gameCount' ]
  console.log('Players\' games: ', rows); // => [ {playerId: 10, playerName: 'Alice', gameCount: 15 }, {...}, ... ]
});


connection.query(`
  SELECT players.id as playerId         -- select the player id and name the field 'playerId'
        ,players.name as playerName     -- select the player name and name the field 'playerName'
        ,COUNT(*) as winCount           -- select the total rows for this player and name that sum 'winCount'
  FROM players                          -- start with the players table
  INNER JOIN games                      -- join the players table with the games table
  ON (games.player1_id = players.id AND games.player1_score = 100)    -- take any rows where our player won
    OR (games.player2_id = players.id AND games.player2_score = 100)  -- either by being player 1 or player 2
  GROUP BY players.id, players.name     -- we want to aggregate the results based on the player id and name
                                        -- so each player gets their own count
`, function(err, rows, fields) {
  if (err) throw err;

  console.log('Fields: ', fields.map(field => field.name)); //=> [ 'playerId', 'playerName', 'winCount' ]
  console.log('Players\' wins: ', rows); // => [ { playerId: 10, playerName: 'Alice', winCount: 6 }, {...}, ... ]
});


// closes connection after all queries are completed
connection.end();
