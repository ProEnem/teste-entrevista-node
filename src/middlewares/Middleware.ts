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
  console.info(parts)
  if (!(parts.length === 2)) {
    response.status(400).send({ error: 'Token error' })
  }
  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    response.status(400).send({ error: 'Token malformatted' })
  }
  try {
    const decoded = await jwt.verify(token, config.development.secret) as object
    request['userId'] = decoded['id']
    return next()
  } catch (error) {
    if (error) {
      response.status(401).send({ error: 'Invalid Token' })
    }
  }
}
export default checkJwt
