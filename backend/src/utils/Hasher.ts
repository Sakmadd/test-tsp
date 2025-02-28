import bcrypt from 'bcrypt';
import { CONFIG } from '../configs/config';
const salt = Number(CONFIG.SECRET_SAUCE);

class Hasher {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export default new Hasher();
