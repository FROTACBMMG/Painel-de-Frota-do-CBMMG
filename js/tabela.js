/********************************************************************
 * Painel da Frota do CBMMG
 * tabela.js
 *
 * Controle da tabela principal da frota.
 ********************************************************************/

"use strict";

let tabela = null;

/********************************************************************
 * Inicializa a tabela
 ********************************************************************/
function inicializarTabela() {

    tabela = $("#tabelaFrota").DataTable({

        language: {

            url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/pt-BR.json"

        },

        pageLength: CONFIG.TABELA_LINHAS,

        destroy: true,

        responsive: true,

        searching: true,

        ordering: true,

        info: true,

        lengthChange: false,

        columns: [

            { data: "prefixo" },

            { data: "placa" },

            { data: "unidade" },

            { data: "subclasse" },

            { data: "combustivel" },

            { data: "situacao" },

            {

                data: "ano",

                className: "text-center"

            },

            {

                data: "valorVenal",

                className: "text-end",

                render: function(valor){

                    return moeda(valor);

                }

            }

        ]

    });

}

/********************************************************************
 * Atualiza a tabela
 ********************************************************************/
function atualizarTabela(dados){

    if(!tabela){

        inicializarTabela();

    }

    tabela.clear();

    tabela.rows.add(dados);

    tabela.draw();

}

/********************************************************************
 * Limpa tabela
 ********************************************************************/
function limparTabela(){

    if(tabela){

        tabela.clear().draw();

    }

}

/********************************************************************
 * Retorna quantidade de linhas
 ********************************************************************/
function quantidadeLinhas(){

    if(!tabela)

        return 0;

    return tabela.rows().count();

}

/********************************************************************
 * Atualiza após filtros
 ********************************************************************/
function atualizarTabelaFiltrada(){

    atualizarTabela(

        dadosFiltrados

    );

}

/********************************************************************
 * Clique na linha
 *
 * Futuramente abrirá o modal.
 ********************************************************************/
$(document).on(

    "click",

    "#tabelaFrota tbody tr",

    function(){

        if(!tabela)

            return;

        const dados = tabela.row(this).data();

        abrirModalViatura(dados);

    }

);