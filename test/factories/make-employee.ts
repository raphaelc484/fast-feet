import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'
import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf'

export function makeEmployee(override: Partial<Employee>, id?: UniqueEntityId) {
  const employee = Employee.create(
    {
      name: faker.person.fullName(),
      responsibility: 'admin',
      cpf: new CPF(generateCPF()),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return employee
}
