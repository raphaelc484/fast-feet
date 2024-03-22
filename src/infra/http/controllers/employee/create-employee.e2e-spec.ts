import { app } from '@/infra/app'
import request from 'supertest'
import { generateCPF } from 'test/utils/generate-cpf'

describe('Create Employee (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new employee', async () => {
    console.log(generateCPF())

    const response = await request(app.server).post('/create-employee').send({
      name: 'Fuji',
      responsibility: 'deliveryman',
      cpf: generateCPF(),
      password: 'password-test',
      email: 'email@test.com',
    })

    console.log(response)

    expect(response.status).toEqual(201)
  })
})
