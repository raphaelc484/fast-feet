import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { CreateEmployeeUseCase } from './create-employee'
import { WrongJobError } from '@/core/errors/errors/wrong-job-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { generateCPF } from 'test/utils/generate-cpf'
import { makeEmployee } from 'test/factories/make-employee'
import { CPF } from '../../enterprise/entities/value-objects/cpf'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let fakeHasher: FakeHasher
let sut: CreateEmployeeUseCase

describe('Create employee use-case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()
    fakeHasher = new FakeHasher()

    sut = new CreateEmployeeUseCase(
      inMemoryEmployeeFakeRepositories,
      fakeHasher,
    )
  })

  it('should be able to create a new employee', async () => {
    const result = await sut.execute({
      name: 'Fuji',
      responsibility: 'deliveryman',
      cpf: generateCPF(),
      password: 'password-test',
      email: 'email@test.com',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryEmployeeFakeRepositories.items[0]).toEqual(
        result.value.employee,
      )
    }
  })

  it('should not be able to create a new employee with wrong job', async () => {
    const result = await sut.execute({
      name: 'Fuji',
      responsibility: 'test-job',
      cpf: generateCPF(),
      password: 'password-test',
      email: 'email@test.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongJobError)
    expect(inMemoryEmployeeFakeRepositories.items).toEqual([])
  })

  it('should not be able to create a new employee with same cpf', async () => {
    const sameCPF = generateCPF()

    const employee = makeEmployee({
      cpf: new CPF(sameCPF),
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      name: 'Fuji-2',
      responsibility: 'deliveryman',
      cpf: sameCPF,
      password: 'password-test',
      email: 'email@test.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
