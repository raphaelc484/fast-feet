import { DomainEvent } from '@/core/events/domain-event'
import { Order } from '../entities/order'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class OrderChangeStatusEvent implements DomainEvent {
  public ocurredAt: Date
  public order: Order

  constructor(order: Order) {
    this.order = order
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.order.id
  }
}
