import { HashCompare } from '@/domain/delivery/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

export class FakeHasher implements HashCompare, HashGenerator {
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}
