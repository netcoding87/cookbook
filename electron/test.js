var express = require('express')
var cors = require('cors')
var sqlite3 = require('sqlite3').verbose()

const dbfile =
  process.env.HOME !== '%HOMEDRIVE%%HOMEPATH%'
    ? process.env.HOME + path.sep + 'cookbook.db'
    : '.cookbook'

exports.Test = function() {
  var app = express()
  var server = null

  function openDatabase() {
    // open the database
    var db = new sqlite3.Database(dbfile, err => {
      if (err) {
        console.error(err.message)
      }
      console.log('Connected to the cookbook database.')
    })

    return db
  }

  function closeDatabase(db) {
    if (db) {
      db.close(err => {
        if (err) {
          console.error(err.message)
        }
        console.log('Close the database connection.')
      })
    }
  }

  function start(port = 4000) {
    if (process.env.NODE_ENV === 'development') {
      app.use(cors({ origin: 'http://localhost:3000' }))
    }

    app.get(`/`, (req, res) => {
      var db = openDatabase()
      var message = ''
      db.all('SELECT rowid AS id, info FROM lorem', function(err, rows) {
        rows.forEach(row => {
          console.log(row.id + ': ' + row.info)
          message += `${row.id}: ${row.info}`
        })
        console.log(message)
        res.send(JSON.stringify(message))
      })
      closeDatabase(db)
    })

    // start the server
    server = app.listen(port, function() {
      console.log(`Server ready at http://localhost:${port}`)
    })
  }

  function stop() {
    if (server) {
      server.close()
      console.log(`Server closed`)
    } else {
      console.error(`Server not running...`)
    }
  }

  return {
    start: start,
    stop: stop,
  }
}
