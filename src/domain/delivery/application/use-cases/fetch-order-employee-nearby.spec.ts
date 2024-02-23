import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { FetchOrderEmployeeNearbyUseCase } from './fetch-order-employee-nearby'
import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { makeEmployee } from 'test/factories/make-employee'
import { makeOrder } from 'test/factories/make-order'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories

let sut: FetchOrderEmployeeNearbyUseCase

describe('Fetch nearby orders use case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()
    sut = new FetchOrderEmployeeNearbyUseCase(
      inMemoryOrderFakeRepositories,
      inMemoryEmployeeFakeRepositories,
    )
  })

  it('should be able to fetch nearby orders', async () => {
    const employee = makeEmployee({})
    inMemoryEmployeeFakeRepositories.items.push(employee)

    const order1 = makeOrder({
      employeeId: employee.id,
      status: 'Ready for Pickup',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const order2 = makeOrder({
      employeeId: employee.id,
      status: 'Ready for Pickup',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const order3 = makeOrder({
      employeeId: employee.id,
      status: 'Ready for Pickup',
      latitude: -27.2098843,
      longitude: -49.6397296,
    })

    const order4 = makeOrder({
      employeeId: employee.id,
      status: 'Ready for Pickup',
      latitude: -22.3262242,
      longitude: -49.0742017,
    })

    inMemoryOrderFakeRepositories.items.push(order1, order2, order3, order4)

    const result = await sut.execute({
      employeeId: employee.id.toString(),
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.orders).toHaveLength(2)
    }
  })

  it('should not be able to fetch nearby orders with a non existing employee', async () => {
    const order1 = makeOrder({
      status: 'Ready for Pickup',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const order2 = makeOrder({
      status: 'Ready for Pickup',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const order3 = makeOrder({
      status: 'Ready for Pickup',
      latitude: -27.2098843,
      longitude: -49.6397296,
    })

    const order4 = makeOrder({
      status: 'Ready for Pickup',
      latitude: -22.3262242,
      longitude: -49.0742017,
    })

    inMemoryOrderFakeRepositories.items.push(order1, order2, order3, order4)

    const result = await sut.execute({
      employeeId: 'john-doe',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
