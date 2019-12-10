// server.js
const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

exports.Server = () => {
  const start = (port = 4000) => {
    // create express server
    const server = jsonServer.create()

    // setup middlewares
    if (process.env.NODE_ENV === 'development') {
      server.use(cors({ origin: 'http://localhost:3201' }))
    }

    // setup database route
    var dbfile = '.cookbook'
    if (process.env.HOME !== '%HOMEDRIVE%%HOMEPATH%') {
      const userdir =
        process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
      const dir = `${userdir}${path.sep}.cookbook`
      !fs.existsSync(dir) && fs.mkdirSync(dir)
      dbfile = `${dir}${path.sep}.cookbook`
    }

    const router = jsonServer.router(dbfile, { foreignKeySuffix: 'Id' })
    server.use(router)

    // start server
    server.listen(port, () => {
      console.log(`JSON Server is running on http://localhost:${port}`)
    })
  }

  return {
    start: start,
  }
}

if (process.env.NODE_ENV === 'development') {
  this.Server().start()
}
