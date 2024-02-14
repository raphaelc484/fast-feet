import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'
import { SomethingWrongWithDeliveryManError } from '@/core/errors/errors/something-wrong-with-deliveryman-error'

interface ChooseDeliveryEmployeePropsRequest {
  orderId: string
  employeeId: string
}

type ChooseDeliveryEmployeePropsResponse = Either<
  UserNotFoundError | OrderNotFoundError | SomethingWrongWithDeliveryManError,
  { order: Order }
>

export class ChooseDeliveryEmployeeUseCase {
  constructor(
    private orderRepositorie: OrderRepositorieContract,
    private employeeRepositorie: EmployeeRepositorieContract,
  ) {}

  async execute({
    orderId,
    employeeId,
  }: ChooseDeliveryEmployeePropsRequest): Promise<ChooseDeliveryEmployeePropsResponse> {
    const employee = await this.employeeRepositorie.findWithID(employeeId)

    if (!employee) {
      return left(new UserNotFoundError())
    }

    if (employee.responsibility === 'admin') {
      return left(new SomethingWrongWithDeliveryManError())
    }

    const order = await this.orderRepositorie.findWithID(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    order.employeeId = employee.id

    await this.orderRepositorie.save(order)

    return right({ order })
  }
}
