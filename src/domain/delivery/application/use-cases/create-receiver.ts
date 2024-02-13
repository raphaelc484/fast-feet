import { Either, left, right } from '@/core/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepositorieContract } from '../repositories-contracts/receiver-repositorie-contract'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { hash } from 'bcryptjs'
import { CPF } from '../../enterprise/entities/value-objects/cpf'

interface ReceiverPropsRequest {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  cpf: string
  email: string
  password: string
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
    email,
    password,
  }: ReceiverPropsRequest): Promise<ReceiverPropsResponse> {
    const findReceiverByCPF = await this.receiverRepositorie.findWithCPF(
      new CPF(cpf).value,
    )

    if (findReceiverByCPF) {
      return left(new UserAlreadyExistsError())
    }

    const password_hash = await hash(password, 6)

    const receiver = Receiver.create({
      name,
      address,
      phonenumber,
      zipcode,
      cpf: new CPF(cpf),
      email,
      password: password_hash,
    })

    await this.receiverRepositorie.create(receiver)

    return right({ receiver })
  }
}
