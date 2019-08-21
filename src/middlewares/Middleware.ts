import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/Config'

const checkJwt = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    response.status(401).send({ error: 'Token not provided' })
    return
  }
  const parts = authHeader.split(' ')
  if (!(parts.length === 2)) {
    response.status(400).send({ error: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$^/i.test(scheme)) {
    response.status(400).send({ error: 'token malformatted' })
  }
  await jwt.sign(token, config.development.secret, (error, decoded) => {
    if (error) {
      response.status(401).send({ error: 'Invalid Token' })
    }
    request['userId'] = decoded
    next()
  })
}
export default checkJwt
