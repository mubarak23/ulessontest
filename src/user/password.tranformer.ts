import { ValueTransformer } from 'typeorm';
import { Hash } from '../utils/hash';

export class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    if (!value) {
      return null;
    }

    return Hash.make(value);
  }

  from(value) {
    return value;
  }
}
