import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface OrderProps {
  productName: string
  employeeId: UniqueEntityId
  receiverId: UniqueEntityId
  slug: Slug
  status: string
  createdAt: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get productName() {
    return this.props.productName
  }

  set productName(productName: string) {
    this.props.productName = productName
    this.props.slug = Slug.createFromText(productName)
    this.touch()
  }

  get employeeId() {
    return this.props.employeeId
  }

  get receiverId() {
    return this.props.receiverId
  }

  get slug() {
    return this.props.slug
  }

  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
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

  static create(
    props: Optional<OrderProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.productName),
        createdAt: new Date(),
      },
      id,
    )

    return order
  }
}
