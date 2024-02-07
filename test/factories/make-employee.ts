import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Employee } from '@/domain/delivery/enterprise/entities/employee'
import { generateCPF } from 'test/utils/generate-cpf'

export function makeEmployee(override: Partial<Employee>, id?: UniqueEntityId) {
  const employee = Employee.create(
    {
      name: faker.person.fullName(),
      responsibility: 'admin',
      cpf: generateCPF(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return employee
}
