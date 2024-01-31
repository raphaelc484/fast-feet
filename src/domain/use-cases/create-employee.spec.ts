import { expect, test } from 'vitest'
import { CreateEmployeeUseCase } from './create-employee'

test('create an employee', () => {
  const createEmployee = new CreateEmployeeUseCase()

  const employee = createEmployee.execute({
    name: 'Fuji',
    responsibility: 'deliveryman',
  })

  expect(employee).toEqual(
    expect.objectContaining({
      name: 'Fuji',
      responsibility: 'deliveryman',
    }),
  )
})
