import { Entity } from '../../core/entities/entities'

interface ReceiverProps {
  name: string
}

export class Receiver extends Entity<ReceiverProps> {
  get name() {
    return this.props.name
  }
}
