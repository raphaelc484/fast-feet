import { FastifyInstance } from 'fastify'
import { CreateEmployeeController } from './create-employee'

export async function employeesRoutes(app: FastifyInstance) {
  app.get('/employee', 'como uso meu controller aqui')
}
