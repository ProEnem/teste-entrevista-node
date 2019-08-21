import StudentService from '../services/StudentService'
import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'
import BcryptHelper from '../helpers/BcryptHelper'
import config from '../config/Config'

export default class StudentController {
  public async all (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const users = await service.all()
      response.send(users)
    } catch (error) {
      response.status(400).send({ error: 'Error loading on users' })
    }
  }

  public async create (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const user = await service.create(request.body)
      user.password = undefined
      response.send(user)
    } catch (error) {
      response.status(400).send({ error: 'Error creating on user' })
    }
  }

  public async createEvaluations (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const { firstEvaluation, secondEvaluation } = request.body
      const id = request['userId'] as number
      await service.createEvaluations(id, firstEvaluation as number, secondEvaluation as number)
      response.send()
    } catch (error) {
      console.error(error)
      response.status(400).send({ error: 'Error creating on test grades for students' })
    }
  }

  public async allEvaluations (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const allTestGrade = await service.allEvaluations()
      response.send(allTestGrade)
    } catch (error) {
      console.error(error)
      response.status(400).send({ error: 'Error all test grades of students' })
    }
  }

  public async findAllAverageStudents (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const evaluationsWithAverage = await service.findAllAverage()
      const evaluations = evaluationsWithAverage[0]
      const totaEvaluations = evaluations.length * 2
      const students = await service.all()
      response.send({ totalStudents: students.length, average: evaluationsWithAverage[1] / totaEvaluations })
    } catch (error) {
      console.error(error)
      response.status(400).send({ error: 'Error all test grades of students' })
    }
  }

  public async findAverageEvaluation (service: StudentService, request: Request, response: Response): Promise<void> {
    try {
      const evaluationsWithAverage = await service.findAverage(request['userId'] as number)
      const evaluations = evaluationsWithAverage[0]
      const totaEvaluations = evaluations.length * 2
      response.send({ evaluations: evaluations, average: evaluationsWithAverage[1] / totaEvaluations })
    } catch (error) {
      console.error(error)
      response.status(400).send({ error: 'Error all test grades of students' })
    }
  }

  public async authenticate (service: StudentService, request: Request, response: Response): Promise<void> {
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
