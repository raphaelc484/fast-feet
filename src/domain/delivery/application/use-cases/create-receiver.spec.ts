import { InMemoryReceiverFakeRepositories } from 'test/fake-repositories/in-memory-receiver-fake-repositories'
import { CreateReceiverUseCase } from './create-receiver'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { generateCPF } from 'test/utils/generate-cpf'
import { makeReceiver } from 'test/factories/make-receiver'
import { CPF } from '../../enterprise/entities/value-objects/cpf'

let inMemoryReceiverFakeRepositories: InMemoryReceiverFakeRepositories
let sut: CreateReceiverUseCase

describe('Create receiver use-case', () => {
  beforeEach(async () => {
    inMemoryReceiverFakeRepositories = new InMemoryReceiverFakeRepositories()

    sut = new CreateReceiverUseCase(inMemoryReceiverFakeRepositories)
  })

  it('should be able to create a new receiver', async () => {
    const result = await sut.execute({
      name: 'Izaura',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: generateCPF(),
      password: 'password-test',
      email: 'receiver@test.com',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryReceiverFakeRepositories.items[0]).toEqual(
        result.value.receiver,
      )
    }
  })

  it('should not be able to create a receiver with an existing cpf', async () => {
    const sameCPF = generateCPF()

    const receiver = makeReceiver({
      cpf: new CPF(sameCPF),
    })

    inMemoryReceiverFakeRepositories.items.push(receiver)

    const result = await sut.execute({
      name: 'Izaura-2',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: sameCPF,
      password: 'password-test',
      email: 'receiver@test.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(UserAlreadyExistsError)
  })
})
