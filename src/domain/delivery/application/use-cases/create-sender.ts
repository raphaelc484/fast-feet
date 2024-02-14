import { Either, left, right } from '@/core/either'
import { Sender } from '../../enterprise/entities/sender'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { SomethingWrongWithCPFError } from '@/core/errors/errors/something-wrong-wtih-cpf-error'
import { SenderRepositorieContract } from '../repositories-contracts/sender-repositorie-contract'

interface SenderPropsRequest {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  cpf: string
  // longitude: string
  // latitude: string
}

type SenderPropsResponse = Either<UserAlreadyExistsError, { sender: Sender }>

export class CreateSenderUseCase {
  constructor(private senderRepositorie: SenderRepositorieContract) {}

  async execute({
    name,
    address,
    phonenumber,
    zipcode,
    cpf,
  }: SenderPropsRequest): Promise<SenderPropsResponse> {
    const cpfFormated = new CPF(cpf)
    const isValidCPF = CPF.isValidCPF(cpfFormated.value)

    if (!isValidCPF) {
      return left(new SomethingWrongWithCPFError())
    }

    const findSenderByCPF = await this.senderRepositorie.findWithCPF(
      cpfFormated.value,
    )

    if (findSenderByCPF) {
      return left(new UserAlreadyExistsError())
    }

    const sender = Sender.create({
      name,
      address,
      phonenumber,
      zipcode,
      cpf: cpfFormated,
    })

    await this.senderRepositorie.create(sender)

    return right({ sender })
  }
}
