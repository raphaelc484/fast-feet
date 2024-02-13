import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from '@/domain/delivery/enterprise/entities/value-objects/cpf'

export function makeReceiver(override: Partial<Receiver>, id?: UniqueEntityId) {
  const receiver = Receiver.create(
    {
      name: faker.person.fullName(),
      address: faker.location.street(),
      phonenumber: faker.phone.number(),
      zipcode: faker.location.zipCode(),
      cpf: new CPF(generateCPF()),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return receiver
}
