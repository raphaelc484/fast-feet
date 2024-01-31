import { Employee } from '../entities/employee'
import { EmployeeRepositorie } from '../repositories/employee-repositorie'

interface EmployeeProps {
  name: string
  responsibility: 'admin' | 'deliveryman'
}

export class CreateEmployeeUseCase {
  constructor(private employeeRepositorie: EmployeeRepositorie) {}

  async execute({ name, responsibility }: EmployeeProps) {
    const employee = new Employee({ name, responsibility })

    await this.employeeRepositorie.create(employee)

    return employee
  }
}
