import { Order } from '../../enterprise/entities/order'

export interface OrderRepositorieContract {
  create(order: Order): Promise<void>
  findWithID(id: string): Promise<Order | null>
  save(order: Order): Promise<void>
}
