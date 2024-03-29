import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepositorieContract } from '../repositories-contracts/receiver-repositorie-contract'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { SomethingWrongWithCPFError } from '@/core/errors/errors/something-wrong-wtih-cpf-error'

interface ReceiverPropsRequest {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  cpf: string
  // longitude: string
  // latitude: string
}

type ReceiverPropsResponse = Either<
  UserAlreadyExistsError,
  { receiver: Receiver }
>

export class CreateReceiverUseCase {
  constructor(private receiverRepositorie: ReceiverRepositorieContract) {}

  async execute({
    name,
    address,
    phonenumber,
    zipcode,
    cpf,
  }: ReceiverPropsRequest): Promise<ReceiverPropsResponse> {
    const cpfFormated = new CPF(cpf)
    const isValidCPF = CPF.isValidCPF(cpfFormated.value)

    if (!isValidCPF) {
      return left(new SomethingWrongWithCPFError())
    }

    const findReceiverByCPF = await this.receiverRepositorie.findWithCPF(
      cpfFormated.value,
    )

    if (findReceiverByCPF) {
      return left(new UserAlreadyExistsError())
    }

    const receiver = Receiver.create({
      name,
      address,
      phonenumber,
      zipcode,
      cpf: cpfFormated,
    })

    await this.receiverRepositorie.create(receiver)

    return right({ receiver })
  }
}
