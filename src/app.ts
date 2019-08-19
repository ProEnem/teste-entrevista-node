import RouteStarter from './routes/Route'
import UserRoute from './routes/UserRoute'

class App extends RouteStarter {
  private userRoute = new UserRoute()

  constructor () {
    super()
    this.routes()
  }

  public routes (): void {
    this.userRoute.routes(this.express)
  }
}
export default new App().express
