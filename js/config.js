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

        PREFIXO: [
    "Prefixo",
    "Prefixo da Viatura",
    "Prefixo Viatura",
    "PREFIXO",
    "PREFIXO DA VIATURA",
    "PREFIXO VIATURA"
],

        PLACA: [
    "Placa",
    "Placa Atual",
    "Placa Viatura",
    "PLACA",
    "PLACA ATUAL",
    "PLACA VIATURA"
],

        UNIDADE: [
    "Nome da Unidade",
    "Nome Unid.",
    "Nome Unid. Veículo",
    "Nome da Unidade do Veículo",
    "NOME DA UNIDADE",
    "NOME UNID.",
    "NOME UNID. VEÍCULO",
    "NOME DA UNIDADE DO VEÍCULO"
],

        COMANDO: "COMANDO",

        SUBCLASSE: "SUBCLASSE VEÍCULO",

        COMBUSTIVEL: "COMBUSTÍVEL DETRAN",

        SITUACAO: [
    "Situação",
    "Situação da Viatura",
    "Situação Atual",
    "Situação Atual da Viatura",
    "SITUAÇÃO",
    "SITUAÇÃO DA VIATURA",
    "SITUAÇÃO ATUAL",
    "SITUAÇÃO ATUAL DA VIATURA",
],

        ANO: "ANO FABR",

        MARCA: "MARCA / MODELO",

        MODELO: "MODELO/ANO",

        VALOR_VENAL: "VALOR VENAL VEÍCULO",

        HODOMETRO: "HODÔMETRO"

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
