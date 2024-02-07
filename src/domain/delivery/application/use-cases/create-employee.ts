import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'
import { WrongJobError } from '@/core/errors/errors/wrong-job-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'

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
    const findCPF = await this.employeeRepositorie.findWithCPF(cpf)

    if (findCPF) {
      return left(new UserAlreadyExistsError())
    }

    if (responsibility !== 'admin' && responsibility !== 'deliveryman') {
      return left(new WrongJobError())
    }

    const password_hash = await this.hashGenerator.hash(password)

    const employee = Employee.create({
      name,
      responsibility,
      cpf,
      password: password_hash,
      email,
    })

    await this.employeeRepositorie.create(employee)

    return right({ employee })
  }
}
