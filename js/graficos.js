/********************************************************************
 * Painel da Frota do CBMMG
 * graficos.js
 *
 * Responsável pelos gráficos do painel.
 ********************************************************************/

"use strict";

let graficoSituacao = null;
let graficoSubclasse = null;

/********************************************************************
 * Inicialização
 ********************************************************************/
function inicializarGraficos() {

    criarGraficoSituacao();

    criarGraficoSubclasse();

}

/********************************************************************
 * Atualiza todos os gráficos
 ********************************************************************/
function atualizarGraficos(dados) {

    atualizarGraficoSituacao(dados);

    atualizarGraficoSubclasse(dados);

}

/********************************************************************
 * Cria gráfico Situação
 ********************************************************************/
function criarGraficoSituacao() {

    const canvas = document.getElementById("graficoSituacao");

    if (!canvas) return;

    graficoSituacao = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [],

            datasets: [{

                data: [],

                backgroundColor: [

                    "#2E7D32",
                    "#F9A825",
                    "#C62828",
                    "#1565C0",
                    "#757575"

                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

/********************************************************************
 * Atualiza gráfico Situação
 ********************************************************************/
function atualizarGraficoSituacao(dados) {

    if (!graficoSituacao)
        return;

    const resumo = {};

    dados.forEach(v => {

        if (!resumo[v.situacao])
            resumo[v.situacao] = 0;

        resumo[v.situacao]++;

    });

    graficoSituacao.data.labels = Object.keys(resumo);

    graficoSituacao.data.datasets[0].data = Object.values(resumo);

    graficoSituacao.update();

}

/********************************************************************
 * Cria gráfico Subclasse
 ********************************************************************/
function criarGraficoSubclasse() {

    const canvas = document.getElementById("graficoSubclasse");

    if (!canvas) return;

    graficoSubclasse = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [],

            datasets: [{

                label: "Quantidade",

                data: [],

                backgroundColor: "#C8102E"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

/********************************************************************
 * Atualiza gráfico Subclasse
 ********************************************************************/
function atualizarGraficoSubclasse(dados) {

    if (!graficoSubclasse)
        return;

    const resumo = {};

    dados.forEach(v => {

        if (!resumo[v.subclasse])
            resumo[v.subclasse] = 0;

        resumo[v.subclasse]++;

    });

    graficoSubclasse.data.labels = Object.keys(resumo);

    graficoSubclasse.data.datasets[0].data = Object.values(resumo);

    graficoSubclasse.update();

}

/********************************************************************
 * Destrói gráficos
 ********************************************************************/
function destruirGraficos() {

    if (graficoSituacao) {

        graficoSituacao.destroy();

        graficoSituacao = null;

    }

    if (graficoSubclasse) {

        graficoSubclasse.destroy();

        graficoSubclasse = null;

    }

}