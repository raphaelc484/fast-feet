import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeEmployee } from 'test/factories/make-employee'
import { ChangePasswordUseCase } from './change-password'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { SamePasswordError } from '@/core/errors/errors/same-password-error'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let fakeHasher: FakeHasher
let fakeCompare: FakeHasher
let sut: ChangePasswordUseCase

describe('Change password use-case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()
    fakeHasher = new FakeHasher()
    fakeCompare = new FakeHasher()

    sut = new ChangePasswordUseCase(
      inMemoryEmployeeFakeRepositories,
      fakeHasher,
      fakeCompare,
    )
  })

  it('should be able to change password', async () => {
    const employee = makeEmployee({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      cpf: employee.cpf.value,
      newPassword: '753461',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryEmployeeFakeRepositories.items[0]).toEqual(
        result.value.employee,
      )
    }
  })

  it('should not be able to change password with the same password', async () => {
    const employee = makeEmployee({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      cpf: employee.cpf.value,
      newPassword: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SamePasswordError)
  })

  it('should not be able to change password of a non-existent user', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-00',
      newPassword: 'password-test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
