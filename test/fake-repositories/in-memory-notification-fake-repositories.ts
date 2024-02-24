import { NotificationRepositoryContracts } from '@/domain/notification/application/repositories-contracts/notification-repository-contract'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationFakeRepositories
  implements NotificationRepositoryContracts
{
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }
}
