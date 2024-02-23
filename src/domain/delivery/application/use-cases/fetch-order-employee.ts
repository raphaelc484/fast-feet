import { Either, left, right } from '@/core/either'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { Order } from '../../enterprise/entities/order'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'

interface FetchOrderEmployeePropsRequest {
  page: number
  employeeId: string
}

type FetchOrderEmployeePropsResponse = Either<
  UserNotFoundError,
  { orders: Order[] }
>

export class FetchOrderEmployeeUseCase {
  constructor(
    private orderRepositorie: OrderRepositorieContract,
    private employeeRepositorie: EmployeeRepositorieContract,
  ) {}

  async execute({
    page,
    employeeId,
  }: FetchOrderEmployeePropsRequest): Promise<FetchOrderEmployeePropsResponse> {
    const employee = await this.employeeRepositorie.findWithID(employeeId)

    if (!employee) {
      return left(new UserNotFoundError())
    }

    const orders = await this.orderRepositorie.findManyOrdersByEmployee(
      { page },
      employeeId,
    )

    console.log(orders)

    return right({ orders })
  }
}
