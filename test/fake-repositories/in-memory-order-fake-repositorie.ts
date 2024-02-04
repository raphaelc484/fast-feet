import { OrderRepositorieContract } from '@/domain/delivery/application/repositories-contracts/order-repositorie-contracts'
import { Order } from '@/domain/delivery/enterprise/entities/order'

export class InMemoryOrderFakeRepositories implements OrderRepositorieContract {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }
}
