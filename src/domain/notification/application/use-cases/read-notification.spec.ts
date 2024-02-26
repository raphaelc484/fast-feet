import { InMemoryNotificationFakeRepositories } from 'test/fake-repositories/in-memory-notification-fake-repositories'
import { ReadNotificationUseCase } from './read-notification'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'

let inMemoryNotificationFakeRepositories: InMemoryNotificationFakeRepositories
let sut: ReadNotificationUseCase

describe('Read Notification use case', () => {
  beforeEach(async () => {
    inMemoryNotificationFakeRepositories =
      new InMemoryNotificationFakeRepositories()
    sut = new ReadNotificationUseCase(inMemoryNotificationFakeRepositories)
  })

  it('should be able to read a notification', async () => {
    // const
    const notification = makeNotification()

    inMemoryNotificationFakeRepositories.items.push(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationFakeRepositories.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('recipient-1'),
    })

    await inMemoryNotificationFakeRepositories.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
