import { SenderRepositorieContract } from '@/domain/delivery/application/repositories-contracts/sender-repositorie-contract'
import { Sender } from '@/domain/delivery/enterprise/entities/sender'

export class InMemorySenderFakeRepositories
  implements SenderRepositorieContract
{
  public items: Sender[] = []

  async create(sender: Sender): Promise<void> {
    this.items.push(sender)
  }

  async findWithCPF(cpf: string): Promise<Sender | null> {
    const sender = this.items.find((item) => item.cpf.value === cpf)

    if (!sender) {
      return null
    }

    return sender
  }

  async findWithID(id: string): Promise<Sender | null> {
    const sender = this.items.find((item) => item.id.toString() === id)

    if (!sender) {
      return null
    }

    return sender
  }
}
