import { Employee } from '../entities/employee'

interface EmployeeProps {
  name: string
  responsibility: 'admin' | 'deliveryman'
}

export class CreateEmployeeUseCase {
  execute({ name, responsibility }: EmployeeProps) {
    const employee = new Employee({ name, responsibility })

    return employee
  }
}
