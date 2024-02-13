import { ReceiverRepositorieContract } from '@/domain/delivery/application/repositories-contracts/receiver-repositorie-contract'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class InMemoryReceiverFakeRepositories
  implements ReceiverRepositorieContract
{
  public items: Receiver[] = []

  async create(receiver: Receiver): Promise<void> {
    this.items.push(receiver)
  }

  async findWithCPF(cpf: string): Promise<Receiver | null> {
    const receiver = this.items.find((item) => item.cpf.value === cpf)

    if (!receiver) {
      return null
    }

    return receiver
  }

  async findWithID(id: string): Promise<Receiver | null> {
    const receiver = this.items.find((item) => item.id.toString() === id)

    if (!receiver) {
      return null
    }

    return receiver
  }
}
