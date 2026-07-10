/********************************************************************
 * Painel da Frota CBMMG
 * utils.js
 *
 * Funções utilitárias utilizadas por todo o sistema.
 ********************************************************************/

"use strict";

// ======================================================
// Verifica se um valor é nulo, indefinido ou vazio
// ======================================================
function estaVazio(valor) {

    return valor === null ||
           valor === undefined ||
           valor === "";

}


// ======================================================
// Converte qualquer valor para número
// ======================================================
function paraNumero(valor) {

    if (valor === null || valor === undefined)
        return 0;

    if (typeof valor === "number")
        return valor;

    valor = valor.toString().trim();

    if (valor === "")
        return 0;

    valor = valor
        .replace(/R\$/g, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const numero = Number(valor);

    return isNaN(numero) ? 0 : numero;

}


// ======================================================
// Formata moeda brasileira
// ======================================================
function moeda(valor) {

    return paraNumero(valor)
        .toLocaleString("pt-BR", {

            style: "currency",

            currency: "BRL"

        });

}


// ======================================================
// Formata número inteiro
// ======================================================
function inteiro(valor) {

    return paraNumero(valor)
        .toLocaleString("pt-BR");

}


// ======================================================
// Calcula idade do veículo
// ======================================================
function idadeVeiculo(anoFabricacao) {

    const anoAtual = new Date().getFullYear();

    return anoAtual - paraNumero(anoFabricacao);

}


// ======================================================
// Remove espaços extras
// ======================================================
function limparTexto(texto) {

    if (estaVazio(texto))
        return "";

    return texto
        .toString()
        .trim()
        .replace(/\s+/g, " ");

}


// ======================================================
// Remove acentos
// ======================================================
function removerAcentos(texto) {

    return limparTexto(texto)

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "");

}


// ======================================================
// Pesquisa sem diferenciar acentos
// ======================================================
function compararTexto(texto1, texto2) {

    return removerAcentos(texto1)
        .toUpperCase()

        .includes(

            removerAcentos(texto2)
            .toUpperCase()

        );

}


// ======================================================
// Soma uma coluna
// ======================================================
function somar(lista, campo) {

    return lista.reduce((total, item) => {

        return total + paraNumero(item[campo]);

    }, 0);

}


// ======================================================
// Média de uma coluna
// ======================================================
function media(lista, campo) {

    if (lista.length === 0)
        return 0;

    return somar(lista, campo) / lista.length;

}


// ======================================================
// Contagem por campo
// ======================================================
function agrupar(lista, campo) {

    const resultado = {};

    lista.forEach(item => {

        const chave = limparTexto(item[campo]);

        if (!resultado[chave])
            resultado[chave] = 0;

        resultado[chave]++;

    });

    return resultado;

}


// ======================================================
// Valores únicos
// ======================================================
function valoresUnicos(lista, campo) {

    const conjunto = new Set();

    lista.forEach(item => {

        conjunto.add(

            limparTexto(item[campo])

        );

    });

    return [...conjunto]

        .filter(x => x !== "")

        .sort();

}


// ======================================================
// Ordena objetos alfabeticamente
// ======================================================
function ordenar(lista, campo) {

    return lista.sort((a, b) => {

        return limparTexto(a[campo])

            .localeCompare(

                limparTexto(b[campo])

            );

    });

}


// ======================================================
// Atualiza texto de um elemento
// ======================================================
function atualizarTexto(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento)
        return;

    elemento.textContent = valor;

}


// ======================================================
// Atualiza HTML
// ======================================================
function atualizarHTML(id, html) {

    const elemento = document.getElementById(id);

    if (!elemento)
        return;

    elemento.innerHTML = html;

}


// ======================================================
// Cria opções de um SELECT
// ======================================================
function preencherSelect(id, lista) {

    const select = document.getElementById(id);

    if (!select)
        return;

    const primeiraOpcao = select.options[0];

    select.innerHTML = "";

    select.appendChild(primeiraOpcao);

    lista.forEach(item => {

        const option = document.createElement("option");

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });

}


// ======================================================
// Data e hora atual
// ======================================================
function dataHoraAtual() {

    return new Date()

        .toLocaleString("pt-BR");

}


// ======================================================
// Log do sistema
// ======================================================
function log(mensagem) {

    console.log(

        "[CBMMG]",

        mensagem

    );

}
