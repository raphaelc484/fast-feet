import { Employee } from '../entities/employee'

export interface EmployeeRepositorie {
  create(employee: Employee): Promise<void>
}
