import * as bcrypt from 'bcrypt'
import { PasswordPool } from './PasswordPool'

export default class PasswordService implements PasswordPool {
  constructor(private readonly plainPassword: string) {}
  async matched(hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(this.plainPassword, hashedPassword)
  }

  hash(): string {
    return bcrypt.hashSync(this.plainPassword, 10)
  }
}
