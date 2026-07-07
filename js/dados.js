/********************************************************************
 * Painel da Frota CBMMG
 * dados.js
 *
 * Responsável por baixar e tratar os dados do Google Sheets.
 ********************************************************************/

"use strict";

/********************************************************************
 * Carrega o CSV publicado pelo Google Sheets
 ********************************************************************/
async function carregarDados() {

    log("Conectando ao Google Sheets...");

    const resposta = await fetch(CONFIG.URL_CSV);

    if (!resposta.ok) {

        throw new Error(
            "Não foi possível acessar a Carta de Situação."
        );

    }

    const csv = await resposta.text();

    const registros = XLSX.utils.sheet_to_json(

        XLSX.read(csv, {

            type: "string"

        }).Sheets.Sheet1,

        {

            defval: "",
            raw: false

        }

    );

    if (registros.length === 0) {

        throw new Error(
            "A Carta de Situação está vazia."
        );

    }

    log("Registros encontrados: " + registros.length);

    validarColunas(registros);

    return registros.map(prepararRegistro);

}

/********************************************************************
 * Prepara um registro
 ********************************************************************/
function prepararRegistro(registro) {

    return classificarRegistro({

        prefixo:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.PREFIXO)
            ),

        placa:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.PLACA)
            ),

        unidade:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.UNIDADE)
            ),

        comando:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.COMANDO)
            ),

        subclasse:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.SUBCLASSE)
            ),

        combustivel:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.COMBUSTIVEL)
            ),

        situacao:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.SITUACAO)
            ),

        marca:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.MARCA)
            ),

        modelo:

            limparTexto(
                obterValor(registro, CONFIG.COLUNAS.MODELO)
            ),

        ano:

            paraNumero(
                obterValor(registro, CONFIG.COLUNAS.ANO)
            ),

        valorVenal:

            paraNumero(
                obterValor(registro, CONFIG.COLUNAS.VALOR_VENAL)
            ),

        hodometro:

            paraNumero(
                obterValor(registro, CONFIG.COLUNAS.HODOMETRO)
            ),

        registroOriginal: registro

    });

}

/********************************************************************
 * Procura automaticamente uma coluna
 ********************************************************************/
function obterValor(registro, alternativas) {

    const mapa = {};

    Object.keys(registro).forEach(chave => {

        mapa[normalizar(chave)] = registro[chave];

    });

    for (const nome of alternativas) {

        const chave = normalizar(nome);

        if (mapa[chave] !== undefined) {

            return mapa[chave];

        }

    }

    return "";

}

/********************************************************************
 * Normaliza nomes
 ********************************************************************/
function normalizar(texto) {

    return removerAcentos(texto)

        .toUpperCase()

        .replace(/\s+/g, " ")

        .trim();

}

/********************************************************************
 * Verifica se todas as colunas existem
 ********************************************************************/
function validarColunas(registros) {

    const colunas = Object.keys(registros[0]);

    const existentes = colunas.map(normalizar);

    const faltando = [];

    for (const campo in CONFIG.COLUNAS) {

        const alternativas = CONFIG.COLUNAS[campo];

        const encontrou = alternativas.some(

            coluna => existentes.includes(

                normalizar(coluna)

            )

        );

        if (!encontrou) {

            faltando.push({

                campo,

                alternativas

            });

        }

    }

    if (faltando.length > 0) {

        let mensagem =

            "Não foi possível localizar algumas colunas.\n\n";

        faltando.forEach(item => {

            mensagem +=

                item.campo + "\n";

            mensagem +=

                "Aceitos: "

                + item.alternativas.join(", ")

                + "\n\n";

        });

        mensagem +=
            "Colunas encontradas:\n\n";

        mensagem += colunas.join("\n");

        throw new Error(mensagem);

    }

}
