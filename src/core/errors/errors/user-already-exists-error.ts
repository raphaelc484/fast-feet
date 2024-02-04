export class UserAlreadyExistsError extends Error {
  constructor() {
    super('CPF already exists')
  }
}
