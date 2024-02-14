import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { CreateOrderUseCase } from './create-order'
import { InMemoryReceiverFakeRepositories } from 'test/fake-repositories/in-memory-receiver-fake-repositories'
import { makeReceiver } from 'test/factories/make-receiver'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { InMemorySenderFakeRepositories } from 'test/fake-repositories/in-memory-sender-fake-repositorie'
import { makeSender } from 'test/factories/make-sender'

let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories
let receiverRepositorie: InMemoryReceiverFakeRepositories
let senderRepositorie: InMemorySenderFakeRepositories
let sut: CreateOrderUseCase

describe('Create order use-case', () => {
  beforeEach(async () => {
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()
    senderRepositorie = new InMemorySenderFakeRepositories()
    receiverRepositorie = new InMemoryReceiverFakeRepositories()

    sut = new CreateOrderUseCase(
      inMemoryOrderFakeRepositories,
      senderRepositorie,
      receiverRepositorie,
    )
  })

  it('should be able to create a new order', async () => {
    const sender = makeSender({})
    const receiver = makeReceiver({})

    senderRepositorie.items.push(sender)
    receiverRepositorie.items.push(receiver)

    const result = await sut.execute({
      productName: 'test-item',
      senderId: sender.id.toString(),
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
    const sender = makeSender({})

    senderRepositorie.items.push(sender)

    const result = await sut.execute({
      productName: 'test-item',
      senderId: sender.id.toString(),
      receiverId: 'john-doe',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to create a new order with a non existing sender', async () => {
    const receiver = makeReceiver({})

    const result = await sut.execute({
      productName: 'test-item',
      senderId: 'john-doe',
      receiverId: receiver.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
