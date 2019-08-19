
import User from '../models/User'
// TO DO: integration with database
export default class UserService {
  public all (): [User] {
    return [new User()]
  }

  public create (): User {
    return new User()
  }
}
