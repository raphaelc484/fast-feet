import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { CreateEmployeeUseCase } from './create-employee'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let sut: CreateEmployeeUseCase

describe('Create employee use-case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()

    sut = new CreateEmployeeUseCase(inMemoryEmployeeFakeRepositories)
  })

  it('should be able to create a new employee', async () => {
    await sut.execute({
      name: 'Fuji',
      responsibility: 'deliveryman',
    })

    expect(inMemoryEmployeeFakeRepositories.items[0]).toEqual(
      expect.objectContaining({
        name: 'Fuji',
        responsibility: 'deliveryman',
      }),
    )
  })
})
