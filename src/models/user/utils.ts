import { User } from './entity';
import { hash } from 'argon2';

export class UserUtils {
  user: User;
  constructor(user: User) {
    this.user = user;
  }

  setPassword = async (password: string) => (this.user.password = await hash(password));
}
