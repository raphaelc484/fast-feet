import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'
import { Prisma, Employee as PrismaEmployee } from '@prisma/client'

export class PrismaEmployeeMaper {
  static toDomain(raw: PrismaEmployee): Employee {
    return Employee.create(
      {
        cpf: raw.cpf,
        email: raw.email,
        name: raw.name,
        password: raw.password,
        responsibility: raw.responsibility,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(employee: Employee): Prisma.EmployeeUncheckedCreateInput {
    return {
      id: employee.id.toString(),
      cpf: employee.cpf.value,
      email: employee.email,
      name: employee.name,
      password: employee.password,
      responsibility: employee.responsibility,
      createdAt: new Date(),
    }
  }
}
