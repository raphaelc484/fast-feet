import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { AuthenticateUseCase } from './authenticate'
import { makeEmployee } from 'test/factories/make-employee'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUseCase

describe('Authenticate use-case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(
      inMemoryEmployeeFakeRepositories,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a employee', async () => {
    const employee = makeEmployee({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)

    const result = await sut.execute({
      cpf: employee.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
  })
})
