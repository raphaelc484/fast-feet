import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { CPF } from './value-objects/cpf'

interface ReceiverProps {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  cpf: CPF
  email: string
  password: string
  // longitude: string
  // latitude: string
  createdAt: Date
  updatedAt?: Date
}

export class Receiver extends Entity<ReceiverProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  get phonenumber() {
    return this.props.phonenumber
  }

  set phonenumber(phonenumber: string) {
    this.props.phonenumber = phonenumber
    this.touch()
  }

  get zipcode() {
    return this.props.zipcode
  }

  set zipcode(zipcode: string) {
    this.props.zipcode = zipcode
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

  // get longitude() {
  //   return this.props.longitude
  // }

  // set longitude(longitude: string) {
  //   this.props.longitude = longitude
  //   this.touch()
  // }

  // get latitude() {
  //   return this.props.latitude
  // }

  // set latitude(latitude: string) {
  //   this.props.latitude = latitude
  //   this.touch()
  // }

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
    props: Optional<ReceiverProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const order = new Receiver(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return order
  }
}
