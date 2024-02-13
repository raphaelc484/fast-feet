import { UseCaseError } from '../use-case-error'

export class SamePasswordError extends Error implements UseCaseError {
  constructor() {
    super('The new password cannot be the same as the old one')
  }
}
