import * as bcrypt from 'bcrypt';

// TODO[Security] Suggestion: choose more complex password hashing algorithm.
export class Hash {
  static make(plainText: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static makePinHash(plainText: string) {
    return bcrypt.hashSync(plainText, process.env.SALT_PASS);
  }

  static compare(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
