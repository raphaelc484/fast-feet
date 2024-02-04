import { InMemoryReceiverFakeRepositories } from 'test/fake-repositories/in-memory-receiver-fake-repositories'
import { CreateReceiverUseCase } from './create-receiver'

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
    })

    expect(inMemoryReceiverFakeRepositories.items[0]).toEqual(result)
  })
})
