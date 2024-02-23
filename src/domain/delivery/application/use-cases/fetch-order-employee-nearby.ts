import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'

interface FetchOrderEmployeeNearbyPropsRequest {
  employeeId: string
  userLatitude: number
  userLongitude: number
}

type FetchOrderEmployeeNearbyPropsResponse = Either<
  UserNotFoundError,
  { orders: Order[] }
>

export class FetchOrderEmployeeNearbyUseCase {
  constructor(
    private orderRepositorie: OrderRepositorieContract,
    private employeeRepositorie: EmployeeRepositorieContract,
  ) {}

  async execute({
    employeeId,
    userLatitude,
    userLongitude,
  }: FetchOrderEmployeeNearbyPropsRequest): Promise<FetchOrderEmployeeNearbyPropsResponse> {
    const employee = await this.employeeRepositorie.findWithID(employeeId)

    if (!employee) {
      return left(new UserNotFoundError())
    }

    const orders = await this.orderRepositorie.findManyNearby({
      employeeId,
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return right({ orders })
  }
}
