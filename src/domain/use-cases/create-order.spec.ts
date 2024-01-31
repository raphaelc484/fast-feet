import { expect, test } from 'vitest'
import { CreateOrderUseCase } from './create-order'

test('create an Order', () => {
  const createOrder = new CreateOrderUseCase()

  const Order = createOrder.execute({
    productName: 'PS5',
    employeeId: '1',
    receiverId: '2',
  })

  expect(Order).toEqual(
    expect.objectContaining({
      productName: 'PS5',
      employeeId: '1',
      receiverId: '2',
    }),
  )
})
