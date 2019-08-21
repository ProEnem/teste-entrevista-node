import express from 'express'
import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import RouteType from './Route'
import checkJwt from '../middlewares/Middleware'

export default class UserRoute extends RouteType {
  private userController = new UserController()

  private userService = new UserService()

  constructor () {
    super()
    this.userController = new UserController()
    this.userService = new UserService()
  }

  public async routes (application: express.Application): Promise<void> {
    application.get('/users', this.userController.all.bind(null, this.userService))
    application.post('/users', this.userController.create.bind(null, this.userService))
    application.post('/users/test_grade', checkJwt, this.userController.createTestGrade.bind(null, this.userService))
    application.post('/authenticate', this.userController.authenticate.bind(null, this.userService))
  }
}
