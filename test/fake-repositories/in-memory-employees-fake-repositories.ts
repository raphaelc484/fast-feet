import { PaginationParams } from '@/core/repositories/pagination-params'
import { EmployeeRepositorieContract } from '@/domain/delivery/application/repositories-contracts/employee-repositorie-contract'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'

export class InMemoryEmployeeFakeRepositories
  implements EmployeeRepositorieContract
{
  public items: Employee[] = []

  async create(employee: Employee): Promise<void> {
    this.items.push(employee)
  }

  async findWithCPF(cpf: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.cpf.value === cpf)

    if (!employee) {
      return null
    }

    return employee
  }

  async save(employee: Employee): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id)
    this.items[itemIndex] = employee
  }

  async findWithID(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id.toString() === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findManyEmployeeDelivery({
    page,
  }: PaginationParams): Promise<Employee[]> {
    const employees = this.items
      .filter((item) => item.responsibility === 'deliveryman')
      .slice((page - 1) * 20, page * 20)

    return employees
  }
}
