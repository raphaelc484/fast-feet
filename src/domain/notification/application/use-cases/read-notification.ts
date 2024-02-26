import { Either, left, right } from '@/core/either'
import { NotificationRepositoryContracts } from '../repositories-contracts/notification-repository-contract'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entities/notification'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ReadNotificationRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationResponse = Either<
  ResourceNotFoundError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepositoryContracts,
  ) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()
    await this.notificationRepository.save(notification)

    return right({ notification })
  }
}
