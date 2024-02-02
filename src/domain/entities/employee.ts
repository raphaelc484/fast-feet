import { Entity } from '../../core/entities/entities'

interface EmployeeProps {
  name: string
  responsibility: string
}

export class Employee extends Entity<EmployeeProps> {
  get name() {
    return this.props.name
  }

  get responsibility() {
    return this.props.responsibility
  }
}
