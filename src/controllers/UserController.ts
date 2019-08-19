import UserService from '../services/UserService'
import { Response, Request } from 'express'

export default class UserController {
  public all (service: UserService, request: Request, response: Response): void {
    const users = service.all()
    response.send(users)
  }

  public create (service: UserService, request: Request, response: Response): void {
    const user = service.create()
    response.send(user)
  }
}
