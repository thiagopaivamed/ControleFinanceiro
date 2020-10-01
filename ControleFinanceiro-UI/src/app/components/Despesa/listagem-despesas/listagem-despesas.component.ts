import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DespesasService } from './../../../services/despesas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listagem-despesas',
  templateUrl: './listagem-despesas.component.html',
  styleUrls: ['./listagem-despesas.component.css'],
})
export class ListagemDespesasComponent implements OnInit {
  despesas = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.despesasService
      .PegarDespesasPeloUsuarioId(this.usuarioId)
      .subscribe((resultado) => {
        resultado.forEach((despesa) => {
          this.opcoesCategorias.push(despesa.categoria.nome);
        });

        this.despesas.data = resultado;
        this.despesas.paginator = this.paginator;
        this.despesas.sort = this.sort;
      });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarCategorias(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['numero', 'descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  FiltrarCategorias(nomeCategoria: string): string[] {
    if (nomeCategoria.trim().length >= 4) {
      this.despesasService
        .FiltrarDespesas(nomeCategoria.toLowerCase())
        .subscribe((resultado) => {
          this.despesas.data = resultado;
        });
    } else {
      if (nomeCategoria === '') {
        this.despesasService
          .PegarDespesasPeloUsuarioId(this.usuarioId)
          .subscribe((resultado) => {
            this.despesas.data = resultado;
          });
      }
    }

    return this.opcoesCategorias.filter((despesa) =>
      despesa.toLowerCase().includes(nomeCategoria.toLowerCase())
    );
  }

  AbrirDialog(despesaId, valor): void {
    this.dialog
      .open(DialogExclusaoDespesasComponent, {
        data: {
          despesaId: despesaId,
          valor: valor,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.despesasService
            .PegarDespesasPeloUsuarioId(this.usuarioId)
            .subscribe((registros) => {
              this.despesas.data = registros;
              this.despesas.paginator = this.paginator;
            });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-despesas',
  templateUrl: 'dialog-exclusao-despesas.html',
})
export class DialogExclusaoDespesasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private despesasService: DespesasService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirDespesa(despesaId): void {
    this.despesasService.ExcluirDespesa(despesaId).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
