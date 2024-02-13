export function generateCPF(): string {
  const nineDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  ).join('')
  const cpfWithoutDigits = nineDigits + '00' // placeholder for the last two digits

  // Calculates the first verification digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfWithoutDigits.charAt(i)) * (10 - i)
  }
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  // Adds the first verification digit to the CPF
  const cpfWithDigit1 =
    cpfWithoutDigits.substring(0, 9) + digit1.toString() + '00'

  // Calculates the second verification digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfWithDigit1.charAt(i)) * (11 - i)
  }
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder

  // Adds the second verification digit to the CPF
  const cpfWithBothDigits =
    cpfWithDigit1.substring(0, 9) + digit1.toString() + digit2.toString()

  // Formats the CPF with dots and dashes
  return cpfWithBothDigits.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  )
}
