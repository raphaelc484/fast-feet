import { UseCaseError } from '../use-case-error'

export class WrongOrderStatusError extends Error implements UseCaseError {
  constructor() {
    super('Invalid status order')
  }
}
