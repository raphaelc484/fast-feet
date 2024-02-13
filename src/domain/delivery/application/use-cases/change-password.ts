import { Either, left, right } from '@/core/either'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { Employee } from '../../enterprise/entities/employee'
import { HashCompare } from '../cryptography/hash-compare'
import { SamePasswordError } from '@/core/errors/errors/same-password-error'

interface EmployeePropsRequest {
  cpf: string
  newPassword: string
}

type EmployeePropsResponse = Either<UserNotFoundError, { employee: Employee }>

export class ChangePasswordUseCase {
  constructor(
    private employeeRepositorie: EmployeeRepositorieContract,
    private hashGenerator: HashGenerator,
    private hashComparer: HashCompare,
  ) {}

  async execute({
    cpf,
    newPassword,
  }: EmployeePropsRequest): Promise<EmployeePropsResponse> {
    const employee = await this.employeeRepositorie.findWithCPF(cpf)

    if (!employee) {
      return left(new UserNotFoundError())
    }

    const isSamePassword = await this.hashComparer.compare(
      newPassword,
      employee.password,
    )

    if (isSamePassword) {
      return left(new SamePasswordError())
    }

    const password_hash = await this.hashGenerator.hash(newPassword)

    employee.password = password_hash

    await this.employeeRepositorie.save(employee)

    return right({ employee })
  }
}
