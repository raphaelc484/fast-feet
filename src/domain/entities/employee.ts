import { randomUUID } from 'node:crypto'

interface EmployeeProps {
  name: string
  responsibility: string
}

export class Employee {
  public id?: string
  public name: string
  public responsibility: string

  constructor(props: EmployeeProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.responsibility = props.responsibility
  }
}
