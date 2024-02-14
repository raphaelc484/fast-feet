import { Sender } from '../../enterprise/entities/sender'

export interface SenderRepositorieContract {
  create(sender: Sender): Promise<void>
  findWithCPF(cpf: string): Promise<Sender | null>
  findWithID(id: string): Promise<Sender | null>
}
