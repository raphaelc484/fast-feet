import { Slug } from './value-objects/slug'
import { Entity } from '../../core/entities/entities'

interface OrderProps {
  productName: string
  employeeId: string
  receiverId: string
  slug: Slug
}

export class Order extends Entity<OrderProps> {
  get productName() {
    return this.props.productName
  }

  get employeeId() {
    return this.props.employeeId
  }

  get receiverId() {
    return this.props.receiverId
  }
}
