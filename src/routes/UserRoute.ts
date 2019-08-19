import express from 'express'

import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import RouteStarter from './Route'

// TO DO: Insert decorators for controller and service
export default class UserRoute extends RouteStarter {
  private userController = new UserController()

  private userService = new UserService()

  constructor () {
    super()
    this.userController = new UserController()
    this.userService = new UserService()
  }

  public routes (application: express.Application): void {
    application.get('/users', this.userController.all.bind(null, this.userService))
    application.post('/users', this.userController.create.bind(null, this.userService))
  }
}
