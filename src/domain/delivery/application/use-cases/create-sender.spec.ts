import { CreateSenderUseCase } from './create-sender'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { makeSender } from 'test/factories/make-sender'
import { InMemorySenderFakeRepositories } from 'test/fake-repositories/in-memory-sender-fake-repositorie'

let inMemorySenderFakeRepositories: InMemorySenderFakeRepositories
let sut: CreateSenderUseCase

describe('Create sender use-case', () => {
  beforeEach(async () => {
    inMemorySenderFakeRepositories = new InMemorySenderFakeRepositories()

    sut = new CreateSenderUseCase(inMemorySenderFakeRepositories)
  })

  it('should be able to create a new sender', async () => {
    const result = await sut.execute({
      name: 'Izaura',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: generateCPF(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemorySenderFakeRepositories.items[0]).toEqual(
        result.value.sender,
      )
    }
  })

  it('should not be able to create a sender with an existing cpf', async () => {
    const sameCPF = generateCPF()

    const sender = makeSender({
      cpf: new CPF(sameCPF),
    })

    inMemorySenderFakeRepositories.items.push(sender)

    const result = await sut.execute({
      name: 'Izaura-2',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: sameCPF,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(UserAlreadyExistsError)
  })
})
