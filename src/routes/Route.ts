import express from 'express'

export default abstract class Route {
  protected express: express.Application

  public constructor () {
    this.express = express()
    this.routes()
  }

  public abstract routes (): void
}
