import fastify from 'fastify'
import { employeesRoutes } from './http/controllers/employee/routes'

export const app = fastify()

app.register(employeesRoutes)
