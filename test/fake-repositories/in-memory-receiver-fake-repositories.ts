import { ReceiverRepositorieContract } from '@/domain/delivery/application/repositories-contracts/receiver-repositorie-contract'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class InMemoryReceiverFakeRepositories
  implements ReceiverRepositorieContract
{
  public items: Receiver[] = []

  async create(receiver: Receiver): Promise<void> {
    this.items.push(receiver)
  }
}
