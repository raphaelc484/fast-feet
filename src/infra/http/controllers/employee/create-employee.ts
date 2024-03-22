import { CreateEmployeeUseCase } from '@/domain/delivery/application/use-cases/create-employee'
import { PrismaEmployeeRepository } from '@/infra/database/prisma/repositories/PrismaEmployeeRepository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'

export async function createEmployee(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createEmployeeSchema = z.object({
    cpf: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    responsibility: z.string(),
  })

  const { cpf, email, name, password, responsibility } =
    createEmployeeSchema.parse(request.body)

  const hashGenerator = new BcryptHasher()
  const employeeRepository = new PrismaEmployeeRepository()
  const createEmployee = new CreateEmployeeUseCase(
    employeeRepository,
    hashGenerator,
  )

  const t = await createEmployee.execute({
    cpf,
    email,
    name,
    password,
    responsibility,
  })

  return replay.status(201).send()
}
