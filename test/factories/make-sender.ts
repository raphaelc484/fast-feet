import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Sender } from '@/domain/delivery/enterprise/entities/sender'
import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf'

export function makeSender(override: Partial<Sender>, id?: UniqueEntityId) {
  const sender = Sender.create(
    {
      name: faker.person.fullName(),
      address: faker.location.street(),
      phonenumber: faker.phone.number(),
      zipcode: faker.location.zipCode(),
      cpf: new CPF(generateCPF()),
      ...override,
    },
    id,
  )

  return sender
}
