/********************************************************************
 * Painel da Frota do CBMMG
 * modal.js
 *
 * Responsável pelo modal de detalhes da viatura.
 ********************************************************************/

"use strict";

/********************************************************************
 * Abre o modal
 ********************************************************************/
function abrirModalViatura(viatura) {

    if (!viatura)
        return;

    atualizarHTML("modalTitulo",
        `${viatura.prefixo} - ${viatura.placa}`
    );

    atualizarHTML("modalConteudo", montarDetalhes(viatura));

    const modal = new bootstrap.Modal(

        document.getElementById("modalViatura")

    );

    modal.show();

}

/********************************************************************
 * Fecha o modal
 ********************************************************************/
function fecharModalViatura() {

    const modal = bootstrap.Modal.getInstance(

        document.getElementById("modalViatura")

    );

    if (modal)
        modal.hide();

}

/********************************************************************
 * Monta o HTML do modal
 ********************************************************************/
function montarDetalhes(v) {

    return `

<div class="container-fluid">

<div class="row">

<div class="col-md-6">

<table class="table table-sm">

<tr>
<th>Prefixo</th>
<td>${v.prefixo}</td>
</tr>

<tr>
<th>Placa</th>
<td>${v.placa}</td>
</tr>

<tr>
<th>Marca</th>
<td>${v.marca}</td>
</tr>

<tr>
<th>Modelo</th>
<td>${v.modelo}</td>
</tr>

<tr>
<th>Ano</th>
<td>${v.ano}</td>
</tr>

<tr>
<th>Idade</th>
<td>${v.idade} anos</td>
</tr>

</table>

</div>

<div class="col-md-6">

<table class="table table-sm">

<tr>
<th>Comando</th>
<td>${v.comando}</td>
</tr>

<tr>
<th>Unidade</th>
<td>${v.unidade}</td>
</tr>

<tr>
<th>Subclasse</th>
<td>${v.subclasse}</td>
</tr>

<tr>
<th>Combustível</th>
<td>${v.combustivel}</td>
</tr>

<tr>
<th>Situação</th>
<td>${badgeSituacao(v.situacao)}</td>
</tr>

<tr>
<th>Valor Venal</th>
<td>${moeda(v.valorVenal)}</td>
</tr>

<tr>
<th>Hodômetro</th>
<td>${inteiro(v.hodometro)} km</td>
</tr>

</table>

</div>

</div>

</div>

`;

}

/********************************************************************
 * Badge da situação
 ********************************************************************/
function badgeSituacao(situacao) {

    let cor = "secondary";

    if (situacao === "OPERACIONAL")
        cor = "success";

    else if (situacao === "MANUTENCAO")
        cor = "warning";

    else if (situacao === "BAIXADA")
        cor = "danger";

    else if (situacao === "SINISTRADA")
        cor = "dark";

    return `
        <span class="badge bg-${cor}">
            ${situacao}
        </span>
    `;

}