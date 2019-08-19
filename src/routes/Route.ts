import express from 'express'
import cors from 'cors'

export default abstract class RouteStarter {
  public express: express.Application

  public constructor () {
    this.express = express()
  }

  public middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }
}
