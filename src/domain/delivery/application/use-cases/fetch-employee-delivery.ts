import { Either, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepositorieContract } from '../repositories-contracts/employee-repositorie-contract'

interface FetchEmployeeDeliveryPropsRequest {
  page: number
}

type FetchEmployeeDeliveryPropsResponse = Either<
  null,
  { employees: Employee[] }
>

export class FetchEmployeeDeliveryUseCase {
  constructor(private employeeRepositorie: EmployeeRepositorieContract) {}

  async execute({
    page,
  }: FetchEmployeeDeliveryPropsRequest): Promise<FetchEmployeeDeliveryPropsResponse> {
    const employees = await this.employeeRepositorie.findManyEmployeeDelivery({
      page,
    })

    return right({ employees })
  }
}
