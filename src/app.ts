import RouteType from './routes/Route'
import UserRoute from './routes/UserRoute'

class App extends RouteType {
  private userRoute = new UserRoute()

  constructor () {
    super()
    this.routes()
  }

  public async routes (): Promise<void> {
    this.userRoute.routes(this.express)
  }
}
export default new App().express
