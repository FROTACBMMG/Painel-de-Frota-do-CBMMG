/********************************************************************
 * Painel da Frota CBMMG
 * app.js
 *
 * Arquivo principal do sistema.
 * Responsável apenas pela inicialização do painel.
 ********************************************************************/

"use strict";

//==================================================
// Base de dados
//==================================================

let dadosOriginais = [];
let dadosFiltrados = [];

//==================================================
// Inicialização
//==================================================

document.addEventListener("DOMContentLoaded", iniciarPainel);

//==================================================
// Inicializa todo o sistema
//==================================================

async function iniciarPainel() {

    mostrarStatus("Conectando ao Google Sheets...");

    mostrarLoading(true);

    try {

        // Carrega os dados do Google Sheets
        dadosOriginais = await carregarDados();

        // Classifica a frota
        dadosOriginais = classificarFrota(dadosOriginais);

        // Cria uma cópia para filtros
        dadosFiltrados = [...dadosOriginais];

        // Inicializa componentes
        inicializarFiltros();

        inicializarTabela();

        inicializarGraficos();

        atualizarPainel();

        atualizarUltimaAtualizacao();

        mostrarStatus(

            `✔ ${dadosOriginais.length.toLocaleString("pt-BR")} viaturas carregadas`

        );

        console.log("Painel iniciado com sucesso.");

    }

    catch (erro) {

        console.error(erro);

        mostrarStatus("Erro ao carregar a Carta de Situação.");

        alert(

            "Não foi possível carregar a Carta de Situação da Frota.\n\n" +

            erro.message

        );

    }

    finally {

        mostrarLoading(false);

    }

}

//==================================================
// Atualiza todos os componentes
//==================================================

function atualizarPainel() {

    atualizarIndicadores(dadosFiltrados);

    atualizarTabela(dadosFiltrados);

    atualizarGraficos(dadosFiltrados);

}

//==================================================
// Atualiza dados do Google
//==================================================

async function atualizarDados() {

    mostrarLoading(true);

    try {

        dadosOriginais = await carregarDados();

        dadosOriginais = classificarFrota(dadosOriginais);

        dadosFiltrados = [...dadosOriginais];

        atualizarFiltros();

        atualizarPainel();

        atualizarUltimaAtualizacao();

        mostrarStatus(

            `✔ ${dadosOriginais.length.toLocaleString("pt-BR")} viaturas carregadas`

        );

    }

    catch (erro) {

        console.error(erro);

        alert(

            "Erro ao atualizar os dados.\n\n" +

            erro.message

        );

    }

    finally {

        mostrarLoading(false);

    }

}

//==================================================
// Eventos
//==================================================

document
    .getElementById("btnAtualizar")
    ?.addEventListener(

        "click",

        atualizarDados

    );

//==================================================
// Atualiza horário
//==================================================

function atualizarUltimaAtualizacao() {

    const agora = new Date();

    document.getElementById(

        "ultimaAtualizacao"

    ).textContent =

        agora.toLocaleString("pt-BR");

}

//==================================================
// Status
//==================================================

function mostrarStatus(texto) {

    const status = document.getElementById(

        "statusSistema"

    );

    if (status)

        status.textContent = texto;

}

//==================================================
// Loading
//==================================================

function mostrarLoading(carregando) {

    const botao = document.getElementById(

        "btnAtualizar"

    );

    if (!botao)

        return;

    if (carregando) {

        botao.disabled = true;

        botao.innerHTML =

            '<span class="spinner-border spinner-border-sm"></span> Atualizando...';

    }

    else {

        botao.disabled = false;

        botao.innerHTML =

            '<i class="fa-solid fa-rotate"></i> Atualizar Dados';

    }

}