import { Either, left, right } from '@/core/either'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { InvalidCredentialsError } from '@/core/errors/errors/invalid-credentials-error'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encrypter'

interface AuthenticateRequest {
  cpf: string
  password: string
}

type AuthenticateResponse = Either<
  InvalidCredentialsError,
  { accessToken: string }
>

export class AuthenticateUseCase {
  constructor(
    private employeeRepositorie: EmployeeRepositorieContract,
    private hashComparer: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const employee = await this.employeeRepositorie.findWithCPF(cpf)

    if (!employee) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      employee.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: employee.id.toString(),
    })

    return right({ accessToken })
  }
}
