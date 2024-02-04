import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepositorieContract } from '../repositories-contracts/receiver-repositorie-contract'

interface ReceiverProps {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  // longitude: string
  // latitude: string
}

export class CreateReceiverUseCase {
  constructor(
    private receiverRepositorieContract: ReceiverRepositorieContract,
  ) {}

  async execute({ name, address, phonenumber, zipcode }: ReceiverProps) {
    const receiver = Receiver.create({
      name,
      address,
      phonenumber,
      zipcode,
    })

    await this.receiverRepositorieContract.create(receiver)

    return receiver
  }
}
