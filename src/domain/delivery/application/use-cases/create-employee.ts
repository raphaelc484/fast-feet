import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'

interface EmployeeProps {
  name: string
  responsibility: string
}

export class CreateEmployeeUseCase {
  constructor(private employeeRepositorie: EmployeeRepositorieContract) {}

  async execute({ name, responsibility }: EmployeeProps) {
    const employee = Employee.create({
      name,
      responsibility,
    })

    await this.employeeRepositorie.create(employee)
  }
}
