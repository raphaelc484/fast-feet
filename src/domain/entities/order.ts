import { randomUUID } from 'node:crypto'
import { Slug } from './value-objects/slug'

interface OrderProps {
  productName: string
  employeeId: string
  receiverId: string
  slug: Slug
}

export class Order {
  public id?: string
  public productName: string
  public employeeId: string
  public receiverId: string
  public slug: Slug

  constructor(props: OrderProps, id?: string) {
    this.id = id ?? randomUUID()
    this.productName = props.productName
    this.employeeId = props.employeeId
    this.receiverId = props.receiverId
    this.slug = props.slug
  }
}
