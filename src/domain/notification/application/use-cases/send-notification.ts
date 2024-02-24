import { Either, right } from '@/core/either'
import { NotificationRepositoryContracts } from '../repositories-contracts/notification-repository-contract'
import { Notification } from '../../enterprise/entities/notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface SendNotificationRequest {
  recipientId: string
  title: string
  content: string
}

type SendNotificationResponse = Either<null, { notification: Notification }>

export class SendNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepositoryContracts,
  ) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return right({ notification })
  }
}
