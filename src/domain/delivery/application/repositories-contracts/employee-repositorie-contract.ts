import { Employee } from '../../enterprise/entities/employee'

export interface EmployeeRepositorieContract {
  create(employee: Employee): Promise<void>
}
