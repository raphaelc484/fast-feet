import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories
let sut: CreateOrderUseCase

describe('Create order use-case', () => {
  beforeEach(async () => {
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()

    sut = new CreateOrderUseCase(inMemoryOrderFakeRepositories)
  })

  it('should be able to create a new order', async () => {
    const result = await sut.execute({
      productName: 'test item',
      receiverId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderFakeRepositories.items[0]).toEqual(result.value?.order)
  })
})
