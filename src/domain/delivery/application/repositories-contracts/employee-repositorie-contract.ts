import { PaginationParams } from '@/core/repositories/pagination-params'
import { Employee } from '../../enterprise/entities/employee'

export interface EmployeeRepositorieContract {
  create(employee: Employee): Promise<void>
  findWithCPF(cpf: string): Promise<Employee | null>
  findWithID(id: string): Promise<Employee | null>
  findManyEmployeeDelivery({ page }: PaginationParams): Promise<Employee[]>
  save(employee: Employee): Promise<void>
}
