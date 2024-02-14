import { UseCaseError } from '../use-case-error'

export class SomethingWrongWithCPFError extends Error implements UseCaseError {
  constructor() {
    super('Something wrong with CPF')
  }
}
