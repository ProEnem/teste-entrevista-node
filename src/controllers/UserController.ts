import UserService from '../services/UserService'
import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'
import BcryptHelper from '../helpers/BcryptHelper'
import config from '../config/Config'

export default class UserController {
  public async all (service: UserService, request: Request, response: Response): Promise<void> {
    try {
      const users = await service.all()
      response.send(users)
    } catch (error) {
      response.status(400).send({ error: 'Error loading on users' })
    }
  }

  public async create (service: UserService, request: Request, response: Response): Promise<void> {
    try {
      const user = await service.create(request.body)
      user.password = undefined
      response.send(user)
    } catch (error) {
      response.status(400).send({ error: 'Error creating on user' })
    }
  }

  public async authenticate (service: UserService, request: Request, response: Response): Promise<void> {
    const { email, password } = request.body
    try {
      if (!email || !password) {
        response.status(400).send({ error: 'Invalid operation. Send email or password' })
      }
      const user = await service.findOne(email)
      const isValidUser = await BcryptHelper.compare(password, user.password)
      if (!isValidUser) {
        response.status(400).send({ error: 'Invalid password' })
      }
      if (!user) {
        response.status(400).send({ error: 'User not found' })
      }
      user.password = undefined
      const token = jwt.sign({ id: user.id }, config.development.secret, { expiresIn: 86400 })
      response.send({ user, token })
    } catch (error) {
      response.status(400).send({ error: 'Error on authenticating' })
    }
  }
}
