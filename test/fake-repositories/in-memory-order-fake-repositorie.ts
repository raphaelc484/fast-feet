import { FindManyNearbyParams } from '@/core/repositories/find-many-nearby-params'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderRepositorieContract } from '@/domain/delivery/application/repositories-contracts/order-repositorie-contracts'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { getDistanceBetweenCoordinates } from 'test/utils/get-distance-between-coordinates'

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

  async findManyOrdersByEmployee(
    { page }: PaginationParams,
    employeeId: string,
  ): Promise<Order[]> {
    const orders = this.items
      .filter(
        (item) =>
          item.employeeId?.toString() === employeeId &&
          item.status !== 'Awaiting Processing' &&
          item.status !== 'Processing',
      )
      .slice((page - 1) * 20, page * 20)

    return orders
  }

  async findManyOrders(employeeId: string): Promise<Order[]> {
    const orders = this.items.filter(
      (item) =>
        item.employeeId?.toString() === employeeId &&
        (item.status === 'Ready for Pickup' ||
          item.status === 'In Transit' ||
          item.status === 'Out for Delivery' ||
          item.status === 'Delivery Attempt Unsuccessful'),
    )

    return orders
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Order[]> {
    const orders = this.items.filter(
      (item) =>
        item.employeeId?.toString() === params.employeeId &&
        (item.status === 'Ready for Pickup' ||
          item.status === 'In Transit' ||
          item.status === 'Out for Delivery' ||
          item.status === 'Delivery Attempt Unsuccessful'),
    )

    return orders.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude, longitude: item.longitude },
      )
      return distance < 10
    })
  }
}
