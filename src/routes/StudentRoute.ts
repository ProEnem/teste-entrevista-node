import express from 'express'
import StudentController from '../controllers/StudentController'
import StudentService from '../services/StudentService'
import RouteType from './Route'
import checkJwt from '../middlewares/Middleware'

export default class StudentRoute extends RouteType {
  private studentController = new StudentController()

  private studentService = new StudentService()

  constructor () {
    super()
    this.studentController = new StudentController()
    this.studentService = new StudentService()
  }

  public async routes (application: express.Application): Promise<void> {
    application.get('/students', this.studentController.all.bind(null, this.studentService))
    application.post('/students', this.studentController.create.bind(null, this.studentService))
    application.post('/students/evaluation', checkJwt, this.studentController.createEvaluations.bind(null, this.studentService))
    application.get('/students/evaluation', checkJwt, this.studentController.allEvaluations.bind(null, this.studentService))
    application.get('/students/evaluation/average', checkJwt, this.studentController.findAverageEvaluation.bind(null, this.studentService))
    application.post('/authenticate', this.studentController.authenticate.bind(null, this.studentService))
  }
}
