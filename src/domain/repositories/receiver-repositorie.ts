import { Receiver } from '../entities/receiver'

export interface ReceiverRepositorie {
  create(Receiver: Receiver): Promise<void>
}
