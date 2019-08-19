import UserService from '../services/UserService'
import { Response, Request } from 'express'

export default class UserController {
  public all (service: UserService, request: Request, response: Response): void {
    // TO DO: Fetch Database
    const users = service.all()
    response.send(users)
  }
}
