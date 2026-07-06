/********************************************************************
 * Painel da Frota do CBMMG
 * config.js
 *
 * Configurações gerais do sistema.
 ********************************************************************/

"use strict";

const CONFIG = {

    //==============================================================
    // Informações do Sistema
    //==============================================================

    SISTEMA: "Painel da Frota do CBMMG",

    VERSAO: "1.0",

    IDIOMA: "pt-BR",

    //==============================================================
    // Fonte de Dados
    //==============================================================

    URL_CSV:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXxyZKqbwCdiYmQ4jZhg774KdppOBxMxcXVsTT2yEQNrDdm2uaQ4r67TopD3tFytbfHei7KCVLKRdT/pub?gid=1799439273&single=true&output=csv",

    //==============================================================
    // Atualização automática
    //==============================================================

    AUTO_REFRESH: false,

    INTERVALO_REFRESH: 300000, // 5 minutos

    //==============================================================
    // Tabela
    //==============================================================

    TABELA_LINHAS: 25,

    //==============================================================
    // Tema
    //==============================================================

    TEMA: "claro",

    //==============================================================
    // Cores Institucionais
    //==============================================================

    CORES: {

        vermelho: "#C8102E",

        vermelhoEscuro: "#9B001E",

        amarelo: "#FFD200",

        azul: "#004A8D",

        verde: "#2E7D32",

        cinzaClaro: "#F4F6F8",

        cinzaEscuro: "#444444"

    },

    //==============================================================
    // Colunas da Carta de Situação
    //==============================================================

    COLUNAS: {

        PREFIXO: "Prefixo da Viatura",

        PLACA: "Placa",

        UNIDADE: "Nome da Unidade",

        COMANDO: "Comando",

        SUBCLASSE: "Subclasse do Veículo",

        COMBUSTIVEL: "Combustível",

        SITUACAO: "Situação",

        ANO: "Ano de Fabricação",

        MARCA: "Marca",

        MODELO: "Modelo",

        VALOR_VENAL: "Valor Venal",

        HODOMETRO: "Hodômetro"

    },

    //==============================================================
    // Situações consideradas operacionais
    //==============================================================

    SITUACOES_OPERACIONAIS: [

        "OPERACIONAL"

    ],

    //==============================================================
    // Situações consideradas manutenção
    //==============================================================

    SITUACOES_MANUTENCAO: [

        "MANUTENCAO",

        "OFICINA",

        "AGUARDANDO PEÇAS",

        "AGUARDANDO PECAS"

    ],

    //==============================================================
    // Combustíveis aceitos
    //==============================================================

    COMBUSTIVEIS: [

        "DIESEL",

        "FLEX",

        "GASOLINA",

        "ETANOL",

        "ELÉTRICO",

        "HIBRIDO"

    ]

};

/********************************************************************
 * Inicialização automática
 ********************************************************************/

console.log(

    `${CONFIG.SISTEMA} - Versão ${CONFIG.VERSAO}`

);