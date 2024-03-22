import { FastifyInstance } from 'fastify'
import { createEmployee } from './create-employee'

export async function employeesRoutes(app: FastifyInstance) {
  app.post('/create-employee', createEmployee)
}
