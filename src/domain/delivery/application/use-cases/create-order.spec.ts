import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { CreateOrderUseCase } from './create-order'
import { InMemoryReceiverFakeRepositories } from 'test/fake-repositories/in-memory-receiver-fake-repositories'
import { makeReceiver } from 'test/factories/make-receiver'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'

let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories
let receiverRepositorie: InMemoryReceiverFakeRepositories
let sut: CreateOrderUseCase

describe('Create order use-case', () => {
  beforeEach(async () => {
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()
    receiverRepositorie = new InMemoryReceiverFakeRepositories()

    sut = new CreateOrderUseCase(
      inMemoryOrderFakeRepositories,
      receiverRepositorie,
    )
  })

  it('should be able to create a new order', async () => {
    const receiver = makeReceiver({})

    receiverRepositorie.items.push(receiver)

    const result = await sut.execute({
      productName: 'test-item',
      receiverId: receiver.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryOrderFakeRepositories.items[0]).toEqual(
        result.value?.order,
      )
    }
  })

  it('should not be able to create a new order with a non existing receiver', async () => {
    const result = await sut.execute({
      productName: 'test-item',
      receiverId: 'john-doe',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
