import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { ChangeStateOrderUseCase } from './change-state-order'
import { makeOrder } from 'test/factories/make-order'
import { WrongOrderStatusError } from '@/core/errors/errors/wrong-status-order-error'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'

let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories

let sut: ChangeStateOrderUseCase

describe('Change state order use-case', () => {
  beforeEach(async () => {
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()

    sut = new ChangeStateOrderUseCase(inMemoryOrderFakeRepositories)
  })

  it('should be able to change status order', async () => {
    const order = makeOrder({})
    inMemoryOrderFakeRepositories.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      status: 'Processing',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryOrderFakeRepositories.items[0]).toEqual(result.value.order)
    }
  })

  it('should not be able to change status order to a non existing status', async () => {
    const order = makeOrder({})
    inMemoryOrderFakeRepositories.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      status: 'teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongOrderStatusError)
  })

  it('should not be able to change status order to a non existing status', async () => {
    const result = await sut.execute({
      orderId: '1',
      status: 'Processing',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
  })
})
