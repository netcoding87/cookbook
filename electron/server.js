var express = require('express')
var path = require('path')

const sqlite3 = require('sqlite3').verbose()

var dbfile =
  process.env.HOME !== '%HOMEDRIVE%%HOMEPATH%'
    ? process.env.HOME + path.sep + 'cookbook.db'
    : '.cookbook'

// open the database
let db = new sqlite3.Database(dbfile, err => {
  if (err) {
    console.error(err.message)
  }
  console.log(process.env.HOME)
  console.log('Connected to the cookbook database.')
})

db.serialize(function() {
  db.run('CREATE TABLE lorem (info TEXT)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()
})

var app = express()

app.get('/', function(req, res) {
  db.serialize(function() {
    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
      res.send(row.id + ': ' + row.info)
    })
  })
  res.send('Hello World!')
})

server = app.listen(4000, function() {
  console.log('🚀 Server ready at http://localhost:4000')
})

server.on('close', () => {
  db.close(err => {
    if (err) {
      console.error(err.message)
    }
    console.log('Close the database connection.')
  })
})
