import { randomUUID } from 'node:crypto'

interface OrderProps {
  productName: string
  employeeId: string
  receiverId: string
}

export class Order {
  public id?: string
  public productName: string
  public employeeId: string
  public receiverId: string

  constructor(props: OrderProps, id?: string) {
    this.id = id ?? randomUUID()
    this.productName = props.productName
    this.employeeId = props.employeeId
    this.receiverId = props.receiverId
  }
}
