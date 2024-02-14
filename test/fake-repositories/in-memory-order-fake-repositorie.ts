import { OrderRepositorieContract } from '@/domain/delivery/application/repositories-contracts/order-repositorie-contracts'
import { Order } from '@/domain/delivery/enterprise/entities/order'

export class InMemoryOrderFakeRepositories implements OrderRepositorieContract {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async findWithID(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)
    this.items[itemIndex] = order
  }
}
