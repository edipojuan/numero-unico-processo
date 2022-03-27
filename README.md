# Númeração Única do Processo

> Identifica o dígito verificador, cujo cálculo de verificação deve ser efetuado pela aplicação do algoritmo Módulo 97 Base 10, conforme Norma ISO 7064

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Descrição](#descri%C3%A7%C3%A3o)
- [Dependências](#depend%C3%AAncias)
- [Testes](#testes)
- [Autor](#autor)
- [Contribuidores](#contribuidores)
- [Licença](#licen%C3%A7a)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Descrição

Art. 1º Fica instituída a numeração única de processos no âmbito do Poder Judiciário, observada a estrutura NNNNNNN-DD.AAAA.J.TR.OOOO, composta de 6 (seis) campos obrigatórios, nos termos da tabela padronizada constante dos Anexos I a VII desta Resolução.

§ 2º O campo (DD), com 2 (dois) dígitos, identifica o dígito verificador, cujo cálculo de verificação deve ser efetuado pela aplicação do algoritmo Módulo 97 Base 10, conforme Norma ISO 7064:2003, nos termos das instruções constantes do Anexo VIII desta Resolução.

## Dependências

Já devem estar devidamente instaladas e configuradas, no ambiente de desenvolvimento, as seguintes dependências:

- [Node.js (^16.13.1)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
- [Yarn (^1.22.18)](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## Testes

De modo a testar as funcionalidades de [`NumeroUnicoProcesso`](./src/numero-unico-processo.util.ts#L22), foram implementados testes unitários, executáveis via Yarn:

- Testes (em modo `--watchAll`): `yarn test`;
- Relatório de cobertura: `yarn coverage`.

## Autor

- **Édipo Juan** - _github_ - [edipojuan](https://github.com/edipojuan)

## Contribuidores

- **Guilherme Gonçalves** - _github_ - [guligon90](https://github.com/guligon90)

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes
