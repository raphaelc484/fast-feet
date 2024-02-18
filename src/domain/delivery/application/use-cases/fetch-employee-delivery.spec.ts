import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { FetchEmployeeDeliveryUseCase } from './fetch-employee-delivery'
import { makeEmployee } from 'test/factories/make-employee'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let sut: FetchEmployeeDeliveryUseCase

describe('Fetch employees delivery use case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()

    sut = new FetchEmployeeDeliveryUseCase(inMemoryEmployeeFakeRepositories)
  })

  it('should be able to fetch employees delivery', async () => {
    for (let i = 1; i <= 3; i++) {
      await inMemoryEmployeeFakeRepositories.create(makeEmployee({}))
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employees).toHaveLength(3)
  })

  it('should be able to fetch paginated employees delivery', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryEmployeeFakeRepositories.create(makeEmployee({}))
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employees).toHaveLength(2)
  })
})
