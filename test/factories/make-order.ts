import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/delivery/enterprise/entities/order'

export function makeOrder(override: Partial<Order>, id?: UniqueEntityId) {
  const order = Order.create(
    {
      productName: faker.person.fullName(),
      employeeId: null,
      senderId: new UniqueEntityId(),
      receiverId: new UniqueEntityId(),
      status: 'Awaiting Processing',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return order
}
