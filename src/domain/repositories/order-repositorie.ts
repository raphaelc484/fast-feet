import { Order } from '../entities/order'

export interface OrderRepositorie {
  create(Order: Order): Promise<void>
}
