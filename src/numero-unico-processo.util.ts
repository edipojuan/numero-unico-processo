/** Classe que representa a Numeração Única do Processo.
 *
 * Fonte: http://www.cnj.jus.br/atos-normativos?documento=119
 *
 * Resolução: Nº 65 de 16/12/2008
 *
 * Norma: ISO 7064
 *
 * Estrutura: NNNNNNN-DD.AAAA.J.TR.OOOO
 */
export class NumeroUnicoProcesso {
  /**
   * Calcula o digito verificador da numeração única do processo
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @return {number} Retorna o digito verificador da numeração única do processo (Algoritmo Módulo 97 Base 10 (Norma ISO 7064))
   */
  static calcularDigitoVerificador(
    numero: number | string,
    ano: number | string,
    origem: number | string,
    jtr: number | string
  ): number {
    const valor = this.calcular(numero, ano, origem, jtr);
    return 98 - (+valor % 97);
  }

  /**
   * Valida o digito verificador da numeração única do processo
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
   * @return {boolean} Retorna um boleano indicando se o digito verificador está correto ou não.
   */
  static validarDigitoVerificador(
    numero: number | string,
    ano: number | string,
    origem: number | string,
    jtr: number | string,
    digitoVerificador: number | string
  ): boolean {
    const valor = this.calcular(numero, ano, origem, jtr, digitoVerificador);
    return +valor % 97 === 1;
  }

  /**
   * Calcula o Módulo 97 Base 10 (Norma ISO 7064)
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
   * @return {string} Retorna a concatenação do valor calculado + origem + digitoVerificador
   */
  private static calcular(
    numero: number | string,
    ano: number | string,
    origem: number | string,
    jtr: number | string,
    digitoVerificador: number | string = 0
  ): string {
    numero = this.formatarNumero(numero);
    ano = this.formatarAno(ano);
    origem = this.formatarOrigem(origem);
    jtr = this.formatarJTR(jtr);
    digitoVerificador = this.formatarDigitoVerificador(digitoVerificador);

    const resto = +numero % 97;
    const valor = `${resto}${ano}${jtr}`;

    const resto2 = +valor % 97;
    const valor2 = `${resto2}${origem}${digitoVerificador}`;

    return valor2;
  }

  /**
   * Formata o Número
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @return {string} Número do processo formatado
   */
  static formatarNumero = (numero: number | string): string =>
    `${numero}`.padStart(7, '0');

  /**
   * Formata o Ano
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @return {string} Retorna o ano do processo formatado
   */
  static formatarAno = (ano: number | string): string =>
    `${ano}`.padStart(4, '0');

  /**
   * Formata a Origem
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @return {string} Retorna a origem do processo formatado
   */
  static formatarOrigem = (origem: number | string): string =>
    `${origem}`.padStart(4, '0');

  /**
   * Formata o JTR (Identificação do órgão da justiça)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @return {string} Retorna o jtr do processo formatado
   */
  static formatarJTR = (jtr: number | string): string =>
    `${jtr}`.padStart(3, '0');

  /**
   * Formata o Dígito Verificador
   * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
   * @return {string} Retorna o jtr do processo formatado
   */
  static formatarDigitoVerificador = (
    digitoVerificador: number | string
  ): string => `${digitoVerificador}`.padStart(2, '0');
}
