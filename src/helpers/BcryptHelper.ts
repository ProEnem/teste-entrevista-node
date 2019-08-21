import bcrypt from 'bcryptjs'

export default class BcryptHelper {
  static async compare (password: string, userPassword: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, userPassword)
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
