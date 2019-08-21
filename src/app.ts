import RouteType from './routes/Route'
import UserRoute from './routes/StudentRoute'
import ConnectionDatabase from './database/ConnectionDatabase'

class App extends RouteType {
  private userRoute = new UserRoute()

  constructor () {
    super()
    this.routes()
  }

  public async connect (): Promise<void> {
    await ConnectionDatabase.connect()
  }

  public async routes (): Promise<void> {
    this.userRoute.routes(this.express)
  }
}

export default new App().express
