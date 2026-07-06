/********************************************************************
 * Painel da Frota do CBMMG
 * filtros.js
 *
 * Controle dos filtros do painel.
 ********************************************************************/

"use strict";

/********************************************************************
 * Inicializa todos os filtros
 ********************************************************************/
function inicializarFiltros() {

    preencherTodosFiltros();

    registrarEventosFiltros();

}

/********************************************************************
 * Preenche todos os SELECTs
 ********************************************************************/
function preencherTodosFiltros() {

    preencherSelect(
        "filtroComando",
        valoresUnicos(dadosOriginais, "comando")
    );

    preencherSelect(
        "filtroUnidade",
        valoresUnicos(dadosOriginais, "unidade")
    );

    preencherSelect(
        "filtroSubclasse",
        valoresUnicos(dadosOriginais, "subclasse")
    );

    preencherSelect(
        "filtroCombustivel",
        valoresUnicos(dadosOriginais, "combustivel")
    );

}

/********************************************************************
 * Eventos
 ********************************************************************/
function registrarEventosFiltros() {

    document
        .getElementById("filtroComando")
        ?.addEventListener("change", aplicarFiltros);

    document
        .getElementById("filtroUnidade")
        ?.addEventListener("change", aplicarFiltros);

    document
        .getElementById("filtroSubclasse")
        ?.addEventListener("change", aplicarFiltros);

    document
        .getElementById("filtroCombustivel")
        ?.addEventListener("change", aplicarFiltros);

    document
        .getElementById("filtroPrefixo")
        ?.addEventListener("input", aplicarFiltros);

    document
        .getElementById("filtroPlaca")
        ?.addEventListener("input", aplicarFiltros);

}

/********************************************************************
 * Aplica todos os filtros
 ********************************************************************/
function aplicarFiltros() {

    const comando =
        document.getElementById("filtroComando")?.value || "";

    const unidade =
        document.getElementById("filtroUnidade")?.value || "";

    const subclasse =
        document.getElementById("filtroSubclasse")?.value || "";

    const combustivel =
        document.getElementById("filtroCombustivel")?.value || "";

    const prefixo =
        limparTexto(
            document.getElementById("filtroPrefixo")?.value || ""
        ).toUpperCase();

    const placa =
        limparTexto(
            document.getElementById("filtroPlaca")?.value || ""
        ).toUpperCase();

    dadosFiltrados = dadosOriginais.filter(registro => {

        if (comando && registro.comando !== comando)
            return false;

        if (unidade && registro.unidade !== unidade)
            return false;

        if (subclasse && registro.subclasse !== subclasse)
            return false;

        if (combustivel && registro.combustivel !== combustivel)
            return false;

        if (
            prefixo &&
            !registro.prefixo.toUpperCase().includes(prefixo)
        )
            return false;

        if (
            placa &&
            !registro.placa.toUpperCase().includes(placa)
        )
            return false;

        return true;

    });

    atualizarDashboard(dadosFiltrados);

}

/********************************************************************
 * Limpa todos os filtros
 ********************************************************************/
function limparFiltros() {

    document.querySelectorAll("select").forEach(select => {

        select.selectedIndex = 0;

    });

    document
        .getElementById("filtroPrefixo").value = "";

    document
        .getElementById("filtroPlaca").value = "";

    dadosFiltrados = [...dadosOriginais];

    atualizarDashboard(dadosFiltrados);

}

/********************************************************************
 * Atualiza filtros
 ********************************************************************/
function atualizarFiltros() {

    preencherTodosFiltros();

    aplicarFiltros();

}