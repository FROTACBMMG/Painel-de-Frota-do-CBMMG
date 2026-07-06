/********************************************************************
 * Painel da Frota do CBMMG
 * dados.js
 *
 * Responsável pela leitura da Carta de Situação
 * diretamente do Google Sheets.
 ********************************************************************/

"use strict";

/********************************************************************
 * Carrega os dados do Google Sheets
 ********************************************************************/
async function carregarDados() {

    log("Conectando ao Google Sheets...");

    const resposta = await fetch(CONFIG.URL_CSV + "&t=" + Date.now());

    if (!resposta.ok) {

        throw new Error(

            "Não foi possível acessar a Carta de Situação."

        );

    }

    const textoCSV = await resposta.text();

    const registros = converterCSV(textoCSV);

    validarColunas(registros);

    const dados = prepararDados(registros);

    log(

        `${dados.length} registros carregados.`

    );

    return dados;

}

/********************************************************************
 * Converte o CSV em objetos JavaScript
 ********************************************************************/
function converterCSV(csv) {

    const linhas = csv.trim().split(/\r?\n/);

    if (linhas.length < 2) {

        throw new Error(

            "A Carta de Situação está vazia."

        );

    }

    const cabecalho = dividirLinhaCSV(linhas[0]);

    const registros = [];

    for (let i = 1; i < linhas.length; i++) {

        if (linhas[i].trim() === "")
            continue;

        const valores = dividirLinhaCSV(linhas[i]);

        const objeto = {};

        cabecalho.forEach((coluna, indice) => {

            objeto[coluna.trim()] =

                valores[indice] ??

                "";

        });

        registros.push(objeto);

    }

    return registros;

}

/********************************************************************
 * Divide corretamente uma linha CSV
 * (respeitando campos entre aspas)
 ********************************************************************/
function dividirLinhaCSV(linha) {

    const resultado = [];

    let texto = "";

    let aspas = false;

    for (let i = 0; i < linha.length; i++) {

        const caractere = linha[i];

        if (caractere === '"') {

            aspas = !aspas;

            continue;

        }

        if (caractere === "," && !aspas) {

            resultado.push(texto);

            texto = "";

            continue;

        }

        texto += caractere;

    }

    resultado.push(texto);

    return resultado;

}

/********************************************************************
 * Valida se todas as colunas obrigatórias existem
 ********************************************************************/
function validarColunas(registros) {

    if (!registros.length) {

        throw new Error(

            "Nenhum registro encontrado."

        );

    }

    const colunas = Object.keys(registros[0]);

    const obrigatorias = Object.values(CONFIG.COLUNAS);

    const ausentes = obrigatorias.filter(

        coluna => !colunas.includes(coluna)

    );

    if (ausentes.length > 0) {

        throw new Error(

            "As seguintes colunas não foram encontradas:\n\n" +

            ausentes.join("\n")

        );

    }

}

/********************************************************************
 * Prepara os dados para utilização
 ********************************************************************/
function prepararDados(registros) {

    return registros.map(registro => {

        return {

            prefixo:

                limparTexto(

                    registro[CONFIG.COLUNAS.PREFIXO]

                ),

            placa:

                limparTexto(

                    registro[CONFIG.COLUNAS.PLACA]

                ),

            unidade:

                limparTexto(

                    registro[CONFIG.COLUNAS.UNIDADE]

                ),

            comando:

                limparTexto(

                    registro[CONFIG.COLUNAS.COMANDO]

                ),

            subclasse:

                limparTexto(

                    registro[CONFIG.COLUNAS.SUBCLASSE]

                ),

            combustivel:

                limparTexto(

                    registro[CONFIG.COLUNAS.COMBUSTIVEL]

                ),

            situacao:

                limparTexto(

                    registro[CONFIG.COLUNAS.SITUACAO]

                ),

            marca:

                limparTexto(

                    registro[CONFIG.COLUNAS.MARCA]

                ),

            modelo:

                limparTexto(

                    registro[CONFIG.COLUNAS.MODELO]

                ),

            ano:

                paraNumero(

                    registro[CONFIG.COLUNAS.ANO]

                ),

            valorVenal:

                paraNumero(

                    registro[CONFIG.COLUNAS.VALOR_VENAL]

                ),

            hodometro:

                paraNumero(

                    registro[CONFIG.COLUNAS.HODOMETRO]

                ),

            idade:

                idadeVeiculo(

                    registro[CONFIG.COLUNAS.ANO]

                ),

            registroOriginal: registro

        };

    });

}

/********************************************************************
 * Atualiza os dados
 ********************************************************************/
async function recarregarDados() {

    return await carregarDados();

}