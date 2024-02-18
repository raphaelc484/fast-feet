import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'
import { OrderStatus } from '../../enterprise/entities/types/order_status'
import { WrongOrderStatusError } from '@/core/errors/errors/wrong-status-order-error'

const validOrderStatuses: string[] = [
  'Awaiting Processing',
  'Processing',
  'Ready for Pickup',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Delivery Attempt Unsuccessful',
  'Held at Customs',
  'Returned to Sender',
]

interface ChangeStateOrderPropsRequest {
  orderId: string
  status: string
}

type ChangeStateOrderPropsResponse = Either<
  WrongOrderStatusError | OrderNotFoundError,
  { order: Order }
>

export class ChangeStateOrderUseCase {
  constructor(private orderRepositorie: OrderRepositorieContract) {}

  async execute({
    orderId,
    status,
  }: ChangeStateOrderPropsRequest): Promise<ChangeStateOrderPropsResponse> {
    if (!validOrderStatuses.includes(status)) {
      return left(new WrongOrderStatusError())
    }

    const order = await this.orderRepositorie.findWithID(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    order.status = status as OrderStatus

    await this.orderRepositorie.save(order)

    return right({ order })
  }
}
