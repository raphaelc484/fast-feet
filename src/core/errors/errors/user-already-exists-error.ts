import { UseCaseError } from '../use-case-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('CPF already exists')
  }
}
