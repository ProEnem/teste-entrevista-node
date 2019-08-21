
import Student, { Evaluation } from '../models/Student'

export default class StudentService {
  public async all (): Promise<Student[]> {
    try {
      const result = await Student.findAll()
      return result
    } catch (error) {
      return []
    }
  }

  public async create ({ email, password, name }): Promise<Student> {
    const user = await Student.create({ email, name, password })
    return user
  }

  public async createEvaluations (id: number, firstEvaluation: number, secondEvaluation: number): Promise<void> {
    const testGrade = await Evaluation.create({ firstEvaluation, secondEvaluation })
    await testGrade.update({ userId: id })
  }

  public async allEvaluations (): Promise<Evaluation[]> {
    const testGrades = await Evaluation.findAll()
    return testGrades
  }

  public async findAverage (id: number): Promise<[Evaluation[], number]> {
    const allEvaluations = await Evaluation.findAll({ where: { userId: id } })
    const reducer = (accumulator: number, currentValue: number): number => accumulator + currentValue
    return [allEvaluations, allEvaluations.map(e => e.firstEvaluation + e.secondEvaluation).reduce(reducer)]
  }

  public async findAllAverage (): Promise<[Evaluation[], number]> {
    const allEvaluations = await Evaluation.findAll()
    const reducer = (accumulator: number, currentValue: number): number => accumulator + currentValue
    return [allEvaluations, allEvaluations.map(e => e.firstEvaluation + e.secondEvaluation).reduce(reducer)]
  }

  public async findOne (email: string): Promise<Student> {
    try {
      const user = await Student.findOne({ where: { email } })
      return user
    } catch (error) {
      console.error(error)
    }
  }
}
