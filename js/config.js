/********************************************************************
 * Painel da Frota CBMMG
 * config.js
 *
 * Configurações gerais do sistema
 ********************************************************************/

"use strict";

const CONFIG = {

    /**************************************************************
     * Fonte de Dados
     **************************************************************/

    URL_CSV:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXxyZKqbwCdiYmQ4jZhg774KdppOBxMxcXVsTT2yEQNrDdm2uaQ4r67TopD3tFytbfHei7KCVLKRdT/pub?gid=1799439273&single=true&output=csv",

    /**************************************************************
     * Configurações Gerais
     **************************************************************/

    TITULO:

        "Painel da Frota do CBMMG",

    VERSAO:

        "1.0",

    IDIOMA:

        "pt-BR",

    TABELA_LINHAS:

        25,

    /**************************************************************
     * Cores Institucionais
     **************************************************************/

    CORES: {

        vermelho: "#C62828",

        vermelhoEscuro: "#8E0000",

        verde: "#2E7D32",

        azul: "#1565C0",

        amarelo: "#F9A825",

        cinza: "#ECEFF1"

    },

    /**************************************************************
     * Colunas da Carta de Situação
     *
     * O sistema procura qualquer um destes nomes.
     **************************************************************/

    COLUNAS: {

        PREFIXO: [

            "Prefixo",

            "Prefixo da Viatura",

            "Prefixo Viatura"

        ],

        PLACA: [

            "Placa",

            "Placa Atual"

        ],

        UNIDADE: [

            "NOME UNID. VEÍCULO",
            "UNIDADE PRINCIPAL",
            "Nome da Unidade",
            "Unidade",
            "Unidade Responsável",
            "Unidade Executora"

        ],

        SUBCLASSE: [

            "SUBCLASSE VEÍCULO",
            "Subclasse do Veículo",
            "Subclasse",
            "Tipo de Viatura"

        ],
    
        COMBUSTIVEL: [

            "COMBUSTÍVEL DETRAN",
            "Combustível",
            "Combustivel"

        ],

        MARCA: [

            "MARCA / MODELO",
            "Marca"

        ],

        MODELO: [

            "MODELO/ANO",
            "Modelo"

        ],

        ANO: [

            "ANO FABR",
            "Ano",
            "Ano de Fabricação"

        ],

            VALOR_VENAL: [

            "VALOR VENAL VEÍCULO",
            "Valor Venal",
            "Valor Venal (R$)",
            "Valor FIPE"

        ],

            HODOMETRO: [

                "Hodômetro",

                "Hodometro",

                "Quilometragem",

                "KM"

        ]

    }

};
