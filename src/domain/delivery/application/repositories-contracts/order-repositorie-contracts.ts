import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'
import { FindManyNearbyParams } from '@/core/repositories/find-many-nearby-params'

export interface OrderRepositorieContract {
  create(order: Order): Promise<void>
  findWithID(id: string): Promise<Order | null>
  save(order: Order): Promise<void>
  findManyOrdersByEmployee(
    { page }: PaginationParams,
    employeeId: string,
  ): Promise<Order[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Order[]>
}
