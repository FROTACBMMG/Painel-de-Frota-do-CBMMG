/********************************************************************
 * Painel da Frota do CBMMG
 * dados.js
 ********************************************************************/

"use strict";

let MAPA = {};

/*********************************************************/
async function carregarDados() {

    log("Conectando ao Google Sheets...");

    const resposta = await fetch(CONFIG.URL_CSV);

    if (!resposta.ok)
        throw new Error("Não foi possível acessar o Google Sheets.");

    const csv = await resposta.text();

    const workbook = XLSX.read(csv, {
        type: "string"
    });

    const planilha = workbook.Sheets[workbook.SheetNames[0]];

    const registros = XLSX.utils.sheet_to_json(planilha, {

        raw: false,
        defval: ""

    });

    if (!registros.length)
        throw new Error("Carta de Situação vazia.");

    criarMapa(Object.keys(registros[0]));

    return registros.map(prepararRegistro);

}

/*********************************************************/
function criarMapa(colunas) {

    MAPA = {};

    colunas.forEach(coluna => {

        const nome = removerAcentos(coluna)
            .toUpperCase();

        if (nome === "PLACA")
            MAPA.placa = coluna;

        else if (nome.includes("PREFIXO"))
            MAPA.prefixo = coluna;

        else if (nome.includes("SUBCLASSE"))
            MAPA.subclasse = coluna;

        else if (nome === "COMANDO")
            MAPA.comando = coluna;

        else if (nome.includes("NOME UNID"))
            MAPA.unidade = coluna;

        else if (nome === "SITUACAO")
            MAPA.situacao = coluna;

        else if (nome.includes("COMBUST"))
            MAPA.combustivel = coluna;

        else if (nome.includes("HOD"))
            MAPA.hodometro = coluna;

        else if (nome.includes("INDICE DE DISPON"))
            MAPA.indiceDisponibilidade = coluna;

        else if (nome.includes("VALOR VENAL"))
            MAPA.valorVenal = coluna;

        else if (nome.includes("ANO FABR"))
            MAPA.ano = coluna;

        else if (nome.includes("MARCA"))
            MAPA.marcaModelo = coluna;

        else if (nome.includes("MODELO/ANO"))
            MAPA.modeloAno = coluna;

    });

    console.table(MAPA);

}

/*********************************************************/
function prepararRegistro(registro) {

    let marca = "";
    let modelo = "";

    if (MAPA.marcaModelo) {

        const partes = registro[MAPA.marcaModelo].split("/");

        marca = partes[0] || "";

        modelo = partes.slice(1).join("/");

    }

    return classificarRegistro({

        prefixo:
            limparTexto(registro[MAPA.prefixo]),

        placa:
            limparTexto(registro[MAPA.placa]),

        unidade:
            limparTexto(registro[MAPA.unidade]),

        comando:
            limparTexto(registro[MAPA.comando]),

        subclasse:
            limparTexto(registro[MAPA.subclasse]),

        situacao:
            limparTexto(registro[MAPA.situacao]),

        combustivel:
            limparTexto(registro[MAPA.combustivel]),

        marca:
            limparTexto(marca),

        modelo:
            limparTexto(modelo),

        ano:
            paraNumero(registro[MAPA.ano]),

        hodometro:
            paraNumero(registro[MAPA.hodometro]),
        
        indiceDisponibilidade: 
            paraNumero(registro[MAPA.indiceDisponibilidade]),
        
        valorVenal:
            paraNumero(registro[MAPA.valorVenal]),

        idade:
            idadeVeiculo(
                registro[MAPA.ano]
            ),

        registroOriginal:
            registro

    });

}
