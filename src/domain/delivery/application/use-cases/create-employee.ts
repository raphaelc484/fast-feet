import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { WrongJobError } from '@/core/errors/errors/wrong-job-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Responsibility_Position } from '../../enterprise/entities/types/responsible_position'
import { CPF } from '../../enterprise/entities/value-objects/cpf'

interface EmployeePropsRequest {
  name: string
  responsibility: string
  cpf: string
  password: string
  email: string
}

type EmployeePropsResponse = Either<
  UserAlreadyExistsError | WrongJobError,
  { employee: Employee }
>

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepositorie: EmployeeRepositorieContract,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    responsibility,
    cpf,
    password,
    email,
  }: EmployeePropsRequest): Promise<EmployeePropsResponse> {
    const findCPF = await this.employeeRepositorie.findWithCPF(
      new CPF(cpf).value,
    )

    if (findCPF) {
      return left(new UserAlreadyExistsError())
    }

    const isValid = Employee.isValidResponsibility(responsibility)

    if (!isValid) {
      return left(new WrongJobError())
    }

    const password_hash = await this.hashGenerator.hash(password)

    const employee = Employee.create({
      name,
      responsibility: responsibility as Responsibility_Position,
      cpf: new CPF(cpf),
      password: password_hash,
      email,
    })

    await this.employeeRepositorie.create(employee)

    return right({ employee })
  }
}
