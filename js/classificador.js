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

    const texto = normalizarTexto(situacao);

    if (texto.includes("DISPON")) {
        return "DISPONIVEL";
    }

    if (
        texto.includes("BAIX") ||
        texto.includes("ACIDENT")
    ) {
        return "MANUTENCAO";
    }

    if (texto.includes("DESCARG")) {
        return "OUTROS";
    }

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
