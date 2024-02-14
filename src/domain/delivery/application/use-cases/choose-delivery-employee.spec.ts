import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { ChooseDeliveryEmployeeUseCase } from './choose-delivery-employee'
import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { makeEmployee } from 'test/factories/make-employee'
import { makeOrder } from 'test/factories/make-order'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'
import { SomethingWrongWithDeliveryManError } from '@/core/errors/errors/something-wrong-with-deliveryman-error'

let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories
let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories

let sut: ChooseDeliveryEmployeeUseCase

describe('Choose employee for order use-case', () => {
  beforeEach(async () => {
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()

    sut = new ChooseDeliveryEmployeeUseCase(
      inMemoryOrderFakeRepositories,
      inMemoryEmployeeFakeRepositories,
    )
  })

  it('should be able to choose a employee for delivery', async () => {
    const order = makeOrder({})
    inMemoryOrderFakeRepositories.items.push(order)

    const employee = makeEmployee({
      responsibility: 'deliveryman',
    })
    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      orderId: order.id.toString(),
      employeeId: employee.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryOrderFakeRepositories.items[0]).toEqual(result.value.order)
    }
  })

  it('should not be able to choose a non existing employee', async () => {
    const order = makeOrder({})
    inMemoryOrderFakeRepositories.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      employeeId: 'fake-employee',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to choose a employee with responsability admin', async () => {
    const order = makeOrder({})
    inMemoryOrderFakeRepositories.items.push(order)

    const employee = makeEmployee({})
    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      orderId: order.id.toString(),
      employeeId: employee.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingWrongWithDeliveryManError)
  })

  it('should not be able to choose a employee for a non existing order', async () => {
    const employee = makeEmployee({
      responsibility: 'deliveryman',
    })
    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      orderId: 'fake-order',
      employeeId: employee.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
  })
})
