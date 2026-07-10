/********************************************************************
 * Painel da Frota CBMMG
 * classificador.js
 *
 * Responsável por padronizar os dados da planilha.
 ********************************************************************/

"use strict";

/********************************************************************
 * Padroniza a situação da viatura
 ********************************************************************/

function classificarSituacao(situacao) {

    situacao = removerAcentos(
        limparTexto(situacao)
    ).toUpperCase();

    // DISPONÍVEL
    if (
        situacao.includes("DISPONIVEL") ||
        situacao.includes("OPER")
    )
        return "DISPONIVEL";

    // MANUTENÇÃO
    if (
        situacao.includes("MANUT") ||
        situacao.includes("OFICINA") ||
        situacao.includes("AGUARD")
    )
        return "MANUTENCAO";

    // BAIXADA
    if (
        situacao.includes("BAIX")
    )
        return "BAIXADA";

    // SINISTRADA
    if (
        situacao.includes("SINISTR")
    )
        return "SINISTRADA";

    return "OUTROS";

}
/********************************************************************
 * Padroniza combustível
 ********************************************************************/
function classificarCombustivel(combustivel) {

    combustivel = removerAcentos(
        limparTexto(combustivel)
    ).toUpperCase();

    if (combustivel.includes("DIESEL"))
        return "DIESEL";

    if (combustivel.includes("GASOLINA"))
        return "GASOLINA";

    if (combustivel.includes("FLEX"))
        return "FLEX";

    if (combustivel.includes("ALCOOL"))
        return "ETANOL";

    if (combustivel.includes("ELETR"))
        return "ELETRICO";

    if (combustivel.includes("HIBRID"))
        return "HIBRIDO";

    return combustivel;

}

/********************************************************************
 * Padroniza texto
 ********************************************************************/
function normalizarTexto(texto) {

    return removerAcentos(
        limparTexto(texto)
    ).toUpperCase();

}

/********************************************************************
 * Classifica um registro inteiro
 ********************************************************************/
function classificarRegistro(registro) {

    registro.situacao = classificarSituacao(
        registro.situacao
    );

    registro.combustivel = classificarCombustivel(
        registro.combustivel
    );

    registro.unidade = limparTexto(
        registro.unidade
    );

    registro.subclasse = limparTexto(
        registro.subclasse
    );

    registro.marca = limparTexto(
        registro.marca
    );

    registro.modelo = limparTexto(
        registro.modelo
    );

    return registro;

}

/********************************************************************
 * Classifica toda a frota
 ********************************************************************/
function classificarFrota(lista) {

    return lista.map(classificarRegistro);

}
