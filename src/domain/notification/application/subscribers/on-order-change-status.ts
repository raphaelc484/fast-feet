import { EventHandler } from '@/core/events/event-handler'
import { OrderChangeStatusEvent } from '@/domain/delivery/enterprise/events/order-change-status-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { ReceiverRepositorieContract } from '@/domain/delivery/application/repositories-contracts/receiver-repositorie-contract'
import { DomainEvents } from '@/core/events/domain-events'

export class OnOrderChangeStatus implements EventHandler {
  constructor(
    private receiverRepositories: ReceiverRepositorieContract,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewStatusNotification.bind(this),
      OrderChangeStatusEvent.name,
    )
  }

  private async sendNewStatusNotification({ order }: OrderChangeStatusEvent) {
    const receiver = await this.receiverRepositories.findWithID(
      order.receiverId.toString(),
    )

    if (receiver) {
      await this.sendNotification.execute({
        recipientId: order.id.toString(),
        title: 'Your order status has been updated',
        content: `Your order status is now at ${order.status}`,
      })
    }
  }
}
