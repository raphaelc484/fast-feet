import { expect, test } from 'vitest'
import { CreateEmployeeUseCase } from './create-employee'
import { EmployeeRepositorie } from '../repositories/employee-repositorie'
import { Employee } from '../entities/employee'

const fakeEmployeeRepositorie: EmployeeRepositorie = {
  create: async (employee: Employee) => {},
}

test('create an employee', async () => {
  const createEmployee = new CreateEmployeeUseCase(fakeEmployeeRepositorie)

  const employee = await createEmployee.execute({
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
