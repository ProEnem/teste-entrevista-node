import UserService from '../services/UserService'
import { Response, Request } from 'express'

export default class UserController {
  public async all (service: UserService, request: Request, response: Response): Promise<void> {
    try {
      const users = await service.all()
      response.send(users)
    } catch (error) {
      console.error(error)
      response.status(400).send({ error: 'Error loading on users' })
    }
  }

  public create (service: UserService, request: Request, response: Response): void {
    const user = service.create()
    response.send(user)
  }

  public authenticate (service: UserService, request: Request, response: Response): void {
    const user = service.create()
    response.send(user)
  }
}
