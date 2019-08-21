
import User from '../models/User'
// TO DO: integration with database
export default class UserService {
  public async all (): Promise<User[]> {
    try {
      const result = await User.findAll()
      return result
    } catch (error) {
      console.info(error)
      return []
    }
  }

  public create (): User {
    return new User()
  }
}
