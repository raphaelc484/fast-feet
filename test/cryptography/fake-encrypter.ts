import { Encrypter } from '@/domain/delivery/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(paylod: Record<string, unknown>): Promise<string> {
    return JSON.stringify(paylod)
  }
}
