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
    application.post('/student', this.studentController.create.bind(null, this.studentService))
    application.post('/student/evaluation', checkJwt, this.studentController.createEvaluations.bind(null, this.studentService))
    application.get('/student/evaluation/average', checkJwt, this.studentController.findAverageEvaluation.bind(null, this.studentService))
    application.get('/students/evaluations/average', checkJwt, this.studentController.findAllAverageStudents.bind(null, this.studentService))
    application.post('/authenticate', this.studentController.authenticate.bind(null, this.studentService))
  }
}
