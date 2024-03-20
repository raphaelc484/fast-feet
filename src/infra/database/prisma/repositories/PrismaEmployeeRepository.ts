import { EmployeeRepositorieContract } from '@/domain/delivery/application/repositories-contracts/employee-repositorie-contract'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'
import { PrismaEmployeeMaper } from '../mappers/mappers-employee'

export class PrismaEmployeeRepository implements EmployeeRepositorieContract {
  constructor(private prisma: PrismaService) {}

  async create(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMaper.toPrisma(employee)

    await this.prisma.employee.create({
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
