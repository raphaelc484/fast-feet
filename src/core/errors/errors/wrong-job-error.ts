import { UseCaseError } from '../use-case-error'

export class WrongJobError extends Error implements UseCaseError {
  constructor() {
    super('Invalid responsibility. Must be "deliveryman" or "admin".')
  }
}
