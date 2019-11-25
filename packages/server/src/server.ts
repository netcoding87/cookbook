import express from 'express'
import { Server as HttpServer } from 'http'

class Server {
  private instance: HttpServer | null
  private app = express()

  constructor() {
    this.instance = null
  }

  start(port = 4000) {
    this.app.get('/', (req, res) => {
      return res.send('GET HTTP method on root resource')
    })

    this.instance = this.app.listen(port, err => {
      if (err) {
        return console.error(err)
      }

      return console.log(`🚀 Server ready at http://localhost:${port}`)
    })
  }

  stop() {
    if (this.instance) {
      this.instance.close()
    }
  }
}

export default Server
