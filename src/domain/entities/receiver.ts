import { randomUUID } from 'node:crypto'

interface ReceiverProps {
  name: string
}

export class Receiver {
  public id?: string
  public name: string

  constructor(props: ReceiverProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
  }
}
