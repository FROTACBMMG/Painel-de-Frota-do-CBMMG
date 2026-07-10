/********************************************************************
 * Painel da Frota do CBMMG
 * dashboard.js
 *
 * Responsável pelos indicadores do Dashboard.
 ********************************************************************/

"use strict";

/********************************************************************
 * Atualiza todos os indicadores do painel
 ********************************************************************/
function atualizarIndicadores(dados) {

    atualizarTotalFrota(dados);

    atualizarDisponivel(dados);

    atualizarManutencao(dados);

    atualizarValorVenal(dados);

    atualizarDisponibilidade(dados);

    atualizarIdadeMedia(dados);

    atualizarQuantidadeSubclasses(dados);

    atualizarTiposCombustivel(dados);

}

/********************************************************************
 * Total da Frota
 ********************************************************************/
function atualizarTotalFrota(dados){

    atualizarTexto(
        "totalFrota",
        inteiro(dados.length)
    );

}

/********************************************************************
 * Disponíveis
 ********************************************************************/
function atualizarDisponivel(dados) {

    const total = dados.filter(item => {

        if (!item) {
            console.log("Registro inexistente");
            return false;
        }

        if (!item.situacao) {
            console.log("Registro sem situação:", item);
            return false;
        }

        return item.situacao
            .toUpperCase()
            .includes("DISPONÍVEL");

    }).length;

    atualizarTexto("operacionais", inteiro(total));

}

/********************************************************************
 * Em Manutenção
 ********************************************************************/
function atualizarManutencao(dados) {

    const total = dados.filter(item => {

        if (!item || !item.situacao)
            return false;

        return item.situacao
            .toUpperCase()
            .includes("MANUT");

    }).length;

    atualizarTexto("manutencao", inteiro(total));

}

/********************************************************************
 * Valor Venal
 ********************************************************************/
function atualizarValorVenal(dados){

    const total = somar(
        dados,
        "valorVenal"
    );

    atualizarTexto(
        "valorVenal",
        moeda(total)
    );

}

/********************************************************************
 * Disponibilidade (%)
 ********************************************************************/
const disponibilidade =
    media(dados, "indiceDisponibilidade");

atualizarTexto(
    "disponibilidade",
    disponibilidade.toFixed(1) + "%"
);

/********************************************************************
 * Idade Média
 ********************************************************************/
function atualizarIdadeMedia(dados){

    if(dados.length===0){

        atualizarTexto(
            "idadeMedia",
            "0 anos"
        );

        return;

    }

    const idade = media(

        dados,

        "idade"

    );

    atualizarTexto(

        "idadeMedia",

        idade.toFixed(1)+" anos"

    );

}

/********************************************************************
 * Quantidade de Subclasses
 ********************************************************************/
function atualizarQuantidadeSubclasses(dados){

    const lista = valoresUnicos(

        dados,

        "subclasse"

    );

    atualizarTexto(

        "totalSubclasses",

        inteiro(lista.length)

    );

}

/********************************************************************
 * Tipos de Combustível
 ********************************************************************/
function atualizarTiposCombustivel(dados){

    const lista = valoresUnicos(

        dados,

        "combustivel"

    );

    atualizarTexto(

        "tiposCombustivel",

        inteiro(lista.length)

    );

}

/********************************************************************
 * Resumo Estatístico
 ********************************************************************/
function obterResumoDashboard(dados){

    const operacionais = dados.filter(

        v=>CONFIG.SITUACOES_OPERACIONAIS.includes(v.situacao)

    ).length;

    const manutencao = dados.filter(

        v=> v.situacao &&
            v.situacao.toUpperCase().includes("MANUT")

    ).length;

    return{

        total:dados.length,

        operacionais,

        manutencao,

        valorVenal:somar(

            dados,

            "valorVenal"

        ),

        disponibilidade:

            dados.length===0

            ?0

            :(operacionais*100)/dados.length,

        idadeMedia:

            media(

                dados,

                "idade"

            ),

        subclasses:

            valoresUnicos(

                dados,

                "subclasse"

            ).length,

        combustiveis:

            valoresUnicos(

                dados,

                "combustivel"

            ).length

    };

}

/********************************************************************
 * Atualiza todo o Dashboard
 ********************************************************************/
function atualizarDashboard(dados){

    atualizarIndicadores(dados);

    atualizarTabela(dados);

    atualizarGraficos(dados);

}
