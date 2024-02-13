export class CPF {
  public value: string

  constructor(value: string) {
    value = this.formatCPF(value)
    if (!this.isValidCPF(value)) {
      throw new Error('CPF inválido')
    }
    this.value = this.formatCPF(value)
  }

  private isValidCPF(cpf: string): boolean {
    // Checks if the CPF has 11 digits
    if (cpf.length !== 11) {
      return false
    }

    // Checks if all digits are equal (common case of invalid CPF)
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false
    }

    // Calculates the verification digits
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let remainder = sum % 11
    const digit1 = remainder < 2 ? 0 : 11 - remainder

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = sum % 11
    const digit2 = remainder < 2 ? 0 : 11 - remainder

    // Checks if the verification digits are correct
    if (
      parseInt(cpf.charAt(9)) !== digit1 ||
      parseInt(cpf.charAt(10)) !== digit2
    ) {
      return false
    }

    // If it passed all checks, the CPF is valid
    return true
  }

  private formatCPF(cpf: string) {
    // Remove every non numerics characters
    return cpf.replace(/\D/g, '')
  }
}
