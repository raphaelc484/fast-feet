import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { CreateEmployeeUseCase } from './create-employee'
import { WrongJobError } from '@/core/errors/errors/wrong-job-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { Employee } from '../../enterprise/entities/employee'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let sut: CreateEmployeeUseCase

describe('Create employee use-case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()

    sut = new CreateEmployeeUseCase(inMemoryEmployeeFakeRepositories)
  })

  it('should be able to create a new employee', async () => {
    const result = await sut.execute({
      name: 'Fuji',
      responsibility: 'deliveryman',
      cpf: '111222333444',
      password: 'password-test',
      email: 'email@test.com',
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(inMemoryEmployeeFakeRepositories.items[0]).toEqual(
      result.value?.employee,
    )
  })

  // it('should not be able to create a new employee with wrong job', async () => {
  //   const result = await sut.execute({
  //     name: 'Fuji',
  //     responsibility: 'test-job',
  //     cpf: '111222333444',
  //     password: 'password-test',
  //     email: 'email@test.com',
  //   })

  //   expect(result).toBeInstanceOf(WrongJobError)
  //   expect(inMemoryEmployeeFakeRepositories.items).toEqual([])
  // })

  // it('should not be able to create a new employee with same cpf', async () => {
  //   await sut.execute({
  //     name: 'Fuji-1',
  //     responsibility: 'deliveryman',
  //     cpf: '111222333444',
  //     password: 'password-test',
  //     email: 'email@test.com',
  //   })

  //   const result = await sut.execute({
  //     name: 'Fuji-2',
  //     responsibility: 'deliveryman',
  //     cpf: '111222333444',
  //     password: 'password-test',
  //     email: 'email@test.com',
  //   })

  //   expect(result).toBeInstanceOf(UserAlreadyExistsError)
  // })
})
