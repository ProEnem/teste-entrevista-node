
import User from '../models/User'

export default class UserService {
  public async all (): Promise<User[]> {
    try {
      const result = await User.findAll()
      return result
    } catch (error) {
      return []
    }
  }

  public async create ({ email, password, name }): Promise<User> {
    const user = await User.create({ email, name, password })
    return user
  }

  public async findOne (email: string): Promise<User> {
    try {
      const user = await User.findOne({ where: { email } })
      return user
    } catch (error) {
      console.error(error)
    }
  }
}
