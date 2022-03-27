import NumeroUnicoProcesso, { IComponentes } from '../numero-unico-processo.util';

describe('Unit tests for "NumeroUnicoProcesso" utility module', () => {

	it('tests if the components from the process number are extracted correctly', () => {
		const processNumber = '0000100-15.2008.8.01.0000';

		const expected = {
			numero: parseInt(processNumber.slice(0, 7)), // 0000100 -> 100 (NNNNNNN)
			ano: parseInt(processNumber.slice(11, 15)), // 2008 (AAAA)
			digitoVerificador: parseInt(processNumber.slice(8, 10)), // 15 (DD)
			jtr: parseInt(processNumber.slice(16, 20).replace('.', '')), // 801 (JTR)
			origem: parseInt(processNumber.slice(21, 25)), // 0000 -> 0 (OOOO)
		}

		const components = NumeroUnicoProcesso.extrairComponentes(processNumber);

		expect(components).toStrictEqual(expected);
	});
	
  test
    .each([
      ['0001664-02.2015.8.10.0062', true],
      ['0000100-15.2008.6.25.0000', false],
    ])("tests if validarDigitoVerificador to %s is %s", (input, expected) => {
      const components = NumeroUnicoProcesso.extrairComponentes(input as string);
      expect(NumeroUnicoProcesso.validarDigitoVerificador(components)).toEqual(expected);			
  });

  test
    .each([
      [{ numero: '0001664', ano: 2015, jtr: 810, origem: '0062' }, 2], // [input, expected]
      [{ numero: 100, ano: '2008', jtr: '625', origem: 0 }, 72],
    ])('tests if calcularDigitoVerificador for %s is %i', (input, expected) => {
      expect(NumeroUnicoProcesso.calcularDigitoVerificador(input as IComponentes)).toEqual(expected);
  });

  test
    .each([
			['TheDarkLord', [TypeError, '"TheDarkLord" não é um número de processo válido']],
			['0001664-02.2025.8.10.0062', [TypeError, '"2025" não é um ano válido']],
		])('tests if extrairComponents for %s generates %s', (input, [exception, message]) => {
      try {
				NumeroUnicoProcesso.extrairComponentes(input);
			} catch (error) {
				expect(error).toBeInstanceOf(exception);
				expect(error).toHaveProperty('message', message);
			}
    });
})
