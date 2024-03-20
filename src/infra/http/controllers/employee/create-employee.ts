import { CreateEmployeeUseCase } from '@/domain/delivery/application/use-cases/create-employee'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateEmployeeController {
  // export async function CreateEmployeeController(
  constructor(private createEmployee: CreateEmployeeUseCase) {}

  async handle(request: FastifyRequest, replay: FastifyReply) {
    const createEmployeeSchema = z.object({
      cpf: z.string(),
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
      responsibility: z.string(),
    })

    const { cpf, email, name, password, responsibility } =
      createEmployeeSchema.parse(request.body)

    await this.createEmployee.execute({
      cpf,
      email,
      name,
      password,
      responsibility,
    })

    return replay.status(201).send()
  }
}
