import { Order } from '../entities/order'

interface OrderProps {
  productName: string
  employeeId: string
  receiverId: string
}

export class CreateOrderUseCase {
  execute({ productName, employeeId, receiverId }: OrderProps) {
    const order = new Order({ productName, employeeId, receiverId })

    return order
  }
}
