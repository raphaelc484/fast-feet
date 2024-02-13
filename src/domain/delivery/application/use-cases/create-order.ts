import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { Either, left, right } from '@/core/either'
import { ReceiverRepositorieContract } from '../repositories-contracts/receiver-repositorie-contract'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'

interface OrderPropsRequest {
  productName: string
  receiverId: string
}

type OrderPropsResponse = Either<UserNotFoundError, { order: Order }>

export class CreateOrderUseCase {
  constructor(
    private orderRepositorie: OrderRepositorieContract,
    private receiverRepositorie: ReceiverRepositorieContract,
  ) {}

  async execute({
    productName,
    receiverId,
  }: OrderPropsRequest): Promise<OrderPropsResponse> {
    const findReceiver = await this.receiverRepositorie.findWithID(receiverId)

    if (!findReceiver) {
      return left(new UserNotFoundError())
    }

    const order = Order.create({
      productName,
      receiverId: new UniqueEntityId(receiverId),
      status: 'Awaiting Processing',
    })

    await this.orderRepositorie.create(order)

    return right({ order })
  }
}
