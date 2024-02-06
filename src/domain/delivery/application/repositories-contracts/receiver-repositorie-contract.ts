import { Receiver } from '../../enterprise/entities/receiver'

export interface ReceiverRepositorieContract {
  create(receiver: Receiver): Promise<void>
  findWithCPF(cpf: string): Promise<Receiver | null>
}
