import { UseCaseError } from '../use-case-error'

export class SomethingWrongWithDeliveryManError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Something wrong with delivery man')
  }
}
