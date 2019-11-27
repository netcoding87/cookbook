const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbfile =
  process.env.HOME !== '%HOMEDRIVE%%HOMEPATH%'
    ? process.env.HOME + path.sep + 'cookbook.db'
    : '.cookbook'

class Server {
  constructor() {
    this.app = express()
    this.server = null
    this.db = null
  }

  openDatabase() {}

  start(port = 4000) {
    // open the database
    this.db = new sqlite3.Database(dbfile, err => {
      if (err) {
        console.error(err.message)
      }
      console.log('Connected to the cookbook database.')
    })

    this.app.get('/', function(req, res) {
      if (db) {
        this.db.serialize(function() {
          this.db.each('SELECT rowid AS id, info FROM lorem', function(
            err,
            row
          ) {
            res.send(row.id + ': ' + row.info)
          })
        })
      } else {
        res.send('No database connection')
      }
    })

    // start the server
    this.server = this.app.listen(port, function() {
      console.log(`🚀 Server ready at http://localhost:${port}`)
    })
  }

  stop() {
    // close the database
    if (this.db) {
      this.db.close(err => {
        if (err) {
          console.error(err.message)
        }
        console.log('Close the database connection.')
      })
    }

    if (this.server) {
      this.server.close()
      console.log('✔ Server closed')
    }
  }
}

module.exports = {
  Server,
}
