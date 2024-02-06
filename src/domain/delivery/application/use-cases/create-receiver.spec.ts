import { InMemoryReceiverFakeRepositories } from 'test/fake-repositories/in-memory-receiver-fake-repositories'
import { CreateReceiverUseCase } from './create-receiver'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'

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
      cpf: '111222333444',
      password: 'password-test',
      email: 'receiver@test.com',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReceiverFakeRepositories.items[0]).toMatchObject({
      name: 'Izaura',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: '111222333444',
      email: 'receiver@test.com',
    })
  })

  it('should not be able to create a receiver with an existing email', async () => {
    await sut.execute({
      name: 'Izaura-1',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: '111222333444',
      password: 'password-test',
      email: 'receiver@test.com',
    })

    const result = await sut.execute({
      name: 'Izaura-2',
      address: 'av teste 718',
      phonenumber: '11999999999',
      zipcode: '02266-000',
      cpf: '111222333444',
      password: 'password-test',
      email: 'receiver@test.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(UserAlreadyExistsError)
  })
})
