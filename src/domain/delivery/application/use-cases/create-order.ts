import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { Either, left, right } from '@/core/either'
import { ReceiverRepositorieContract } from '../repositories-contracts/receiver-repositorie-contract'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { SenderRepositorieContract } from '../repositories-contracts/sender-repositorie-contract'

interface OrderPropsRequest {
  productName: string
  senderId: string
  receiverId: string
}

type OrderPropsResponse = Either<UserNotFoundError, { order: Order }>

export class CreateOrderUseCase {
  constructor(
    private orderRepositorie: OrderRepositorieContract,
    private senderRepositorie: SenderRepositorieContract,
    private receiverRepositorie: ReceiverRepositorieContract,
  ) {}

  async execute({
    productName,
    senderId,
    receiverId,
  }: OrderPropsRequest): Promise<OrderPropsResponse> {
    const findsender = await this.senderRepositorie.findWithID(senderId)
    const findReceiver = await this.receiverRepositorie.findWithID(receiverId)

    if (!findReceiver || !findsender) {
      return left(new UserNotFoundError())
    }

    const order = Order.create({
      productName,
      senderId: new UniqueEntityId(senderId),
      receiverId: new UniqueEntityId(receiverId),
      status: 'Awaiting Processing',
    })

    await this.orderRepositorie.create(order)

    return right({ order })
  }
}
