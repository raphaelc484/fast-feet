import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { CPF } from './value-objects/cpf'

interface SenderProps {
  name: string
  address: string
  phonenumber: string
  zipcode: string
  cpf: CPF
  // longitude: string
  // latitude: string
  createdAt: Date
  updatedAt?: Date
}

export class Sender extends Entity<SenderProps> {
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
    props: Optional<SenderProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const sender = new Sender(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return sender
  }
}
