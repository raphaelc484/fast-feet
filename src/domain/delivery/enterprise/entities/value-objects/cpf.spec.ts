import { generateCPF } from 'test/utils/generate-cpf'
import { CPF } from './cpf'

test('it should be able to format the cpf', () => {
  const cpfGenerated = generateCPF()
  const cpf = new CPF(cpfGenerated)

  expect(cpf.value).toEqual(cpfGenerated.replace(/\D/g, ''))
})
