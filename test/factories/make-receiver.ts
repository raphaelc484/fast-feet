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
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      cpf: new CPF(generateCPF()),
      ...override,
    },
    id,
  )

  return receiver
}
