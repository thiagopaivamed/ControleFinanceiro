import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  qtdCartoes: number;
  ganhoTotal: number;
  despesaTotal: number;
  saldo: number;
  anoAtual: number = new Date().getFullYear();
  anoInicial: number = this.anoAtual - 10;
  anos: number[];

  usuarioId: string = localStorage.getItem('UsuarioId');

  dados: ChartDataSets[];
  labels: Label[];
  opcoes = {
    responsive: true,
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  };
  plugins = [];
  tipo = 'line';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .PegarDadosCardsDashboard(this.usuarioId)
      .subscribe((resultado) => {
        this.qtdCartoes = resultado.qtdCartoes;
        this.ganhoTotal = resultado.ganhoTotal;
        this.despesaTotal = resultado.despesaTotal;
        this.saldo = resultado.saldo;
      });

    this.anos = this.CarregarAnos(this.anoInicial, this.anoAtual);

    this.dashboardService
      .PegarDadosAnuaisPeloUsuarioId(this.usuarioId, this.anoAtual)
      .subscribe((resultado) => {
        this.labels = this.RetornarMeses(resultado.meses);

        this.dados = [
          {
            data: this.RetornarValoresGanhos(resultado.meses, resultado.ganhos),
            label: 'Ganho de R$',
            fill: false,
            borderColor: '#27ae60',
            backgroundColor: '#27ae60',
            pointBackgroundColor: '#27ae60',
            pointBorderColor: '#27ae60',
            pointHoverBackgroundColor: '#27ae60',
            pointHoverBorderColor: '#27ae60',
          },

          {
            data: this.RetornarValoresDespesas(
              resultado.meses,
              resultado.despesas
            ),
            label: 'Despesa de R$',
            fill: false,
            borderColor: '#c0392b',
            backgroundColor: '#c0392b',
            pointBackgroundColor: '#c0392b',
            pointBorderColor: '#c0392b',
            pointHoverBackgroundColor: '#c0392b',
            pointHoverBorderColor: '#c0392b',
          },
        ];
      });
  }

  CarregarAnos(anoInicial, anoAtual): number[] {
    const anos = [];

    while (anoInicial <= anoAtual) {
      anos.push(anoInicial);
      anoInicial = anoInicial + 1;
    }

    return anos;
  }

  RetornarMeses(dadosMeses: any): string[] {
    const meses = [];
    let indice = 0;
    const qtdMeses = dadosMeses.length;

    while (indice < qtdMeses) {
      meses.push(dadosMeses[indice].nome);
      indice = indice + 1;
    }

    return meses;
  }

  RetornarValoresGanhos(dadosMeses: any, dadosGanhos: any): number[] {
    const valores = [];
    let indiceMeses = 0;
    let indiceGanhos = 0;
    const qtdMeses = dadosMeses.length;
    const qtdGanhos = dadosGanhos.length;

    while (indiceMeses <= qtdMeses - 1) {
      if (indiceGanhos <= qtdGanhos - 1) {
        if (dadosGanhos[indiceGanhos].mesId === dadosMeses[indiceMeses].mesId) {
          valores.push(dadosGanhos[indiceGanhos].valores);
          indiceGanhos = indiceGanhos + 1;
          indiceMeses = indiceMeses + 1;
        } else {
          valores.push(0);
          indiceMeses = indiceMeses + 1;
        }
      } else {
        valores.push(0);
        indiceMeses = indiceMeses + 1;
      }
    }

    return valores;
  }

  RetornarValoresDespesas(dadosMeses: any, dadosDespesas: any): number[] {
    const valores = [];
    let indiceMeses = 0;
    let indiceDespesas = 0;
    const qtdMeses = dadosMeses.length;
    const qtdDespesas = dadosDespesas.length;

    while (indiceMeses <= qtdMeses - 1) {
      if (indiceDespesas <= qtdDespesas - 1) {
        if (
          dadosDespesas[indiceDespesas].mesId === dadosMeses[indiceMeses].mesId
        ) {
          valores.push(dadosDespesas[indiceDespesas].valores);
          indiceDespesas = indiceDespesas + 1;
          indiceMeses = indiceMeses + 1;
        } else {
          valores.push(0);
          indiceMeses = indiceMeses + 1;
        }
      } else {
        valores.push(0);
        indiceMeses = indiceMeses + 1;
      }
    }

    return valores;
  }

  CarregarDados(anoSelecionado: number): void {
    this.dashboardService
      .PegarDadosAnuaisPeloUsuarioId(this.usuarioId, anoSelecionado)
      .subscribe((resultado) => {
        this.labels = this.RetornarMeses(resultado.meses);

        this.dados = [
          {
            data: this.RetornarValoresGanhos(resultado.meses, resultado.ganhos),
            label: 'Ganho de R$',
            fill: false,
            borderColor: '#27ae60',
            backgroundColor: '#27ae60',
            pointBackgroundColor: '#27ae60',
            pointBorderColor: '#27ae60',
            pointHoverBackgroundColor: '#27ae60',
            pointHoverBorderColor: '#27ae60',
          },

          {
            data: this.RetornarValoresDespesas(
              resultado.meses,
              resultado.despesas
            ),
            label: 'Despesa de R$',
            fill: false,
            borderColor: '#c0392b',
            backgroundColor: '#c0392b',
            pointBackgroundColor: '#c0392b',
            pointBorderColor: '#c0392b',
            pointHoverBackgroundColor: '#c0392b',
            pointHoverBorderColor: '#c0392b',
          },
        ];
      });
  }
}
