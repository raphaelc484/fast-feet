import { InMemoryNotificationFakeRepositories } from 'test/fake-repositories/in-memory-notification-fake-repositories'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationFakeRepositories: InMemoryNotificationFakeRepositories

let sut: SendNotificationUseCase

describe('Send Notification use case', () => {
  beforeEach(async () => {
    inMemoryNotificationFakeRepositories =
      new InMemoryNotificationFakeRepositories()
    sut = new SendNotificationUseCase(inMemoryNotificationFakeRepositories)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteudo nova notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationFakeRepositories.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
