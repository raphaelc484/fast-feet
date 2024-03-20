import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Employee,
  EmployeeProps,
} from '@/domain/delivery/enterprise/entities/employee'
import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf'

export function makeEmployee(override: Partial<Employee>, id?: UniqueEntityId) {
  const employee = Employee.create(
    {
      name: faker.person.fullName(),
      responsibility: 'deliveryman',
      cpf: new CPF(generateCPF()),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return employee
}

// export class EmployeeFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaEmployee(
//     data: Partial<EmployeeProps> = {},
//   ): Promise<Employee> {
//     const employee = makeEmployee(data)

//     await this.prisma.employee.create({
//       data: 'aqui vai o mapper para mudar o retorno',
//     })
//   }
// }
