import { InMemoryEmployeeFakeRepositories } from 'test/fake-repositories/in-memory-employees-fake-repositories'
import { makeEmployee } from 'test/factories/make-employee'
import { FetchOrderEmployeeUseCase } from './fetch-order-employee'
import { InMemoryOrderFakeRepositories } from 'test/fake-repositories/in-memory-order-fake-repositorie'
import { makeOrder } from 'test/factories/make-order'

let inMemoryEmployeeFakeRepositories: InMemoryEmployeeFakeRepositories
let inMemoryOrderFakeRepositories: InMemoryOrderFakeRepositories
let sut: FetchOrderEmployeeUseCase

describe('Fetch orders with employeeId use case', () => {
  beforeEach(async () => {
    inMemoryEmployeeFakeRepositories = new InMemoryEmployeeFakeRepositories()
    inMemoryOrderFakeRepositories = new InMemoryOrderFakeRepositories()

    sut = new FetchOrderEmployeeUseCase(
      inMemoryOrderFakeRepositories,
      inMemoryEmployeeFakeRepositories,
    )
  })

  it('should be able to fetch orders by employee', async () => {
    const employee = makeEmployee({
      responsibility: 'deliveryman',
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)

    for (let i = 1; i <= 3; i++) {
      await inMemoryOrderFakeRepositories.create(
        makeOrder({ employeeId: employee.id, status: 'Ready for Pickup' }),
      )
    }

    // console.log(inMemoryOrderFakeRepositories.items)

    const result = await sut.execute({
      page: 1,
      employeeId: employee.id.toString(),
    })

    // console.log(result.value)

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value?.orders).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated employees delivery', async () => {
    const employee = makeEmployee({
      responsibility: 'deliveryman',
    })

    inMemoryEmployeeFakeRepositories.items.push(employee)
    for (let i = 1; i <= 22; i++) {
      await inMemoryOrderFakeRepositories.create(
        makeOrder({ employeeId: employee.id, status: 'Ready for Pickup' }),
      )
    }

    const result = await sut.execute({
      page: 2,
      employeeId: employee.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value?.orders).toHaveLength(2)
    }
  })
})
