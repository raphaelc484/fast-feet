import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Responsibility_Position } from './types/responsible_position'

interface EmployeeProps {
  name: string
  responsibility: Responsibility_Position
  cpf: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date
}

export class Employee extends Entity<EmployeeProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get responsibility() {
    return this.props.responsibility
  }

  set responsibility(responsibility: Responsibility_Position) {
    this.props.responsibility = responsibility
    this.touch()
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static isValidResponsibility(job: string): boolean {
    const responsibilityPositions: string[] = ['admin', 'deliveryman']

    return responsibilityPositions.includes(job)
  }

  static create(
    props: Optional<EmployeeProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const employee = new Employee(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return employee
  }
}
