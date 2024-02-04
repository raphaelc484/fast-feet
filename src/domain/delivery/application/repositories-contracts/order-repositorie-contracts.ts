import { Order } from '../../enterprise/entities/order'

export interface OrderRepositorieContract {
  create(order: Order): Promise<void>
}
