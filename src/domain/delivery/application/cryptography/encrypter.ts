export interface Encrypter {
  encrypt(paylod: Record<string, unknown>): Promise<string>
}
