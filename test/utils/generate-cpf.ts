export function generateCPF(): string {
  // Generate nine random numbers
  const cpfNumbers = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  )

  // Calculate the first verification digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfNumbers[i] * (10 - i)
  }
  let firstDigit = sum % 11
  if (firstDigit > 9) {
    firstDigit = 0
  }

  // Add the first verification digit to the CPF
  cpfNumbers.push(firstDigit)

  // Calculate the second verification digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += cpfNumbers[i] * (11 - i)
  }
  let secondDigit = sum % 11
  if (secondDigit > 9) {
    secondDigit = 0
  }

  // Add the second verification digit to the CPF
  cpfNumbers.push(secondDigit)

  // Return the formatted CPF
  return (
    cpfNumbers.slice(0, 3).join('') +
    '.' +
    cpfNumbers.slice(3, 6).join('') +
    '.' +
    cpfNumbers.slice(6, 9).join('') +
    '-' +
    cpfNumbers.slice(9).join('')
  )
}
