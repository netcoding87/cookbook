var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(4000, function() {
  console.log('🚀 Server ready at http://localhost:4000')
})
