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

interface IComponentes {
  numero: number | string;
  ano: number | string;
  digitoVerificador?: number | string;
  orgao?: number | string;
  tr?: number | string;
  jtr: number | string;
  origem: number | string;
}

class NumeroUnicoProcesso {
  /**
   * Calcula o digito verificador da numeração única do processo
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @return {number} Retorna o digito verificador da numeração única do processo
   *         (Algoritmo Módulo 97 Base 10 (Norma ISO 7064))
   */

  static REGEX = new RegExp(
    [
      /^(?<numero>\d{7})-/,
      /(?<digitoVerificador>\d{2})./,
      /(?<ano>\d{4})./,
      /(?<orgao>\d{1})./,
      /(?<tr>\d{2})./,
      /(?<origem>\d{4})$/,
    ]
      .map((item) => item.source)
      .join(''),
  );

  static calcularDigitoVerificador({ numero, ano, origem, jtr }: IComponentes): number {
    const valor = this.calcular({ numero, ano, origem, jtr });
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
  static validarDigitoVerificador({ numero, ano, origem, jtr, digitoVerificador }: IComponentes): boolean {
    const valor = this.calcular({ numero, ano, origem, jtr, digitoVerificador });
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
  private static calcular({ numero, ano, origem, jtr, digitoVerificador = 0 }: IComponentes): string {
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
   * Extrai as componentes da string que representa o número de processo
   * @param {string} numeroDeProcesso - Número de processo no formato NNNNNNN-DD.AAAA.J.TR.OOOO
   * @return {Object.<string, number>} componentes - O objeto contendo as componentes do número de processo
   * @return {number} componentes.numero - Número da numeração única do processo (NNNNNNN)
   * @return {number} componentes.digitoVerificador - Digito Verificador da numeração única do processo (DD)
   * @return {number} componentes.ano - Ano da numeração única do processo (AAAA)
   * @return {number} componentes.jtr - Identificação do órgão da justiça (JTR)
   * @return {number} componentes.origem - Origem da numeração única do processo (OOOO)
   */
  static extrairComponentes(numeroDeProcesso: string): IComponentes {
    const matches = this.REGEX.exec(numeroDeProcesso);
    const groups: Partial<IComponentes> | undefined = matches?.groups;

    if (matches === null || groups === undefined) {
      throw new TypeError(`"${numeroDeProcesso}" não é um número de processo válido`);
    }

    const { ano, orgao, tr } = groups;

    if (ano && parseInt(ano as string) > new Date().getFullYear()) {
      throw new TypeError(`"${ano}" não é um ano válido`);
    }

    groups['jtr'] = `${orgao}${tr}`;
    delete groups.orgao;
    delete groups.tr;

    const componentes: IComponentes = {
      numero: 0,
      ano: 0,
      jtr: 0,
      origem: 0,
    };

    for (const [key, value] of Object.entries(groups)) {
      componentes[key as keyof IComponentes] = Number(value);
    }

    return componentes;
  }

  /**
   * Formata o Número
   * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
   * @return {string} Número do processo formatado
   */
  static formatarNumero = (numero: number | string): string => `${numero}`.padStart(7, '0');

  /**
   * Formata o Ano
   * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
   * @return {string} Retorna o ano do processo formatado
   */
  static formatarAno = (ano: number | string): string => `${ano}`.padStart(4, '0');

  /**
   * Formata a Origem
   * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
   * @return {string} Retorna a origem do processo formatado
   */
  static formatarOrigem = (origem: number | string): string => `${origem}`.padStart(4, '0');

  /**
   * Formata o JTR (Identificação do órgão da justiça)
   * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
   * @return {string} Retorna o jtr do processo formatado
   */
  static formatarJTR = (jtr: number | string): string => `${jtr}`.padStart(3, '0');

  /**
   * Formata o Dígito Verificador
   * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
   * @return {string} Retorna o jtr do processo formatado
   */
  static formatarDigitoVerificador = (digitoVerificador: number | string): string =>
    `${digitoVerificador}`.padStart(2, '0');
}

export default NumeroUnicoProcesso;
export { IComponentes };
