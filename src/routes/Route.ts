import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

abstract class RouteType {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
  }

  public middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }
}

export default RouteType
