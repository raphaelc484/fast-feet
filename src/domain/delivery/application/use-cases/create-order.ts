import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order, OrderStatus } from '../../enterprise/entities/order'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { Either, right } from '@/core/either'

interface OrderPropsRequest {
  productName: string
  receiverId: string
}

type OrderPropsResponse = Either<null, { order: Order }>

export class CreateOrderUseCase {
  constructor(private orderRepositorieContract: OrderRepositorieContract) {}

  async execute({
    productName,
    receiverId,
  }: OrderPropsRequest): Promise<OrderPropsResponse> {
    const order = Order.create({
      productName,
      receiverId: new UniqueEntityId(receiverId),
      status: OrderStatus.AwaitingProcessing,
    })

    await this.orderRepositorieContract.create(order)

    return right({ order })
  }
}
