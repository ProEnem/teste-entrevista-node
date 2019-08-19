
import User from '../models/User'
export default class UserService {
  public all (): [User] {
    return [new User()]
  }
}
