import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrderRepositorieContract } from '../repositories-contracts/order-repositorie-contracts'

interface OrderProps {
  productName: string
  employeeId: string
  receiverId: string
}

export class CreateOrderUseCase {
  constructor(private orderRepositorieContract: OrderRepositorieContract) {}

  async execute({ productName, employeeId, receiverId }: OrderProps) {
    const order = Order.create({
      productName,
      employeeId: new UniqueEntityId(employeeId),
      receiverId: new UniqueEntityId(receiverId),
      status: 'Awaiting Processing',
    })

    await this.orderRepositorieContract.create(order)

    return order
  }
}
