import Route from './Route'
import UserController from '../controllers/UserController'
import UserService from '../services/UserService'

// TO DO: Insert decorators for controller and service
export default class UserRoute extends Route {
  private userController: UserController

  private userService: UserService

  constructor () {
    super()
    this.userController = new UserController()
    this.userService = new UserService()
  }

  public routes (): void {
    this.express.get('/users', this.userController.all.bind(null, this.userService))
  }
}
