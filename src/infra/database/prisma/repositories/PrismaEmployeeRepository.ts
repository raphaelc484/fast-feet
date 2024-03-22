import { EmployeeRepositorieContract } from '@/domain/delivery/application/repositories-contracts/employee-repositorie-contract'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'
import { PrismaEmployeeMaper } from '../mappers/mappers-employee'
import { prisma } from '../prisma'

export class PrismaEmployeeRepository implements EmployeeRepositorieContract {
  async create(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMaper.toPrisma(employee)

    await prisma.employee.create({
      data,
    })
  }

  findWithCPF(cpf: string): Promise<Employee | null> {
    throw new Error('Method not implemented.')
  }

  findWithID(id: string): Promise<Employee | null> {
    throw new Error('Method not implemented.')
  }

  findManyEmployeeDelivery({ page }: PaginationParams): Promise<Employee[]> {
    throw new Error('Method not implemented.')
  }

  save(employee: Employee): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
