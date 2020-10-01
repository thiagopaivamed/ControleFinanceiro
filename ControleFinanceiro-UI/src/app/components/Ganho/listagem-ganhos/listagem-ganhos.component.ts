import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GanhosService } from './../../../services/ganhos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listagem-ganhos',
  templateUrl: './listagem-ganhos.component.html',
  styleUrls: ['./listagem-ganhos.component.css'],
})
export class ListagemGanhosComponent implements OnInit {
  ganhos = new MatTableDataSource<any>();
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
    private ganhosService: GanhosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ganhosService
      .PegarGanhosPeloUsuarioId(this.usuarioId)
      .subscribe((resultado) => {
        resultado.forEach((ganho) => {
          this.opcoesCategorias.push(ganho.categoria.nome);
        });
        this.ganhos.data = resultado;
        this.ganhos.paginator = this.paginator;
        this.ganhos.sort = this.sort;
      });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarCategorias(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  FiltrarCategorias(nomeCategoria: string): string[] {
    if (nomeCategoria.trim().length >= 4) {
      this.ganhosService
        .FiltrarGanhos(nomeCategoria.toLowerCase())
        .subscribe((resultado) => {
          this.ganhos.data = resultado;
        });
    } else {
      if (nomeCategoria === '') {
        this.ganhosService
          .PegarGanhosPeloUsuarioId(this.usuarioId)
          .subscribe((resultado) => {
            this.ganhos.data = resultado;
          });
      }
    }

    return this.opcoesCategorias.filter((nome) =>
      nome.toLowerCase().includes(nomeCategoria.toLowerCase())
    );
  }

  AbrirDialog(ganhoId, valor): void {
    this.dialog
      .open(DialogExclusaoGanhosComponent, {
        data: {
          ganhoId: ganhoId,
          valor: valor,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.ganhosService
            .PegarGanhosPeloUsuarioId(this.usuarioId)
            .subscribe((registros) => {
              this.ganhos.data = registros;
              this.ganhos.paginator = this.paginator;
            });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-ganhos',
  templateUrl: 'dialog-exclusao-ganhos.html',
})
export class DialogExclusaoGanhosComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ganhosService: GanhosService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirGanho(ganhoId): void {
    this.ganhosService.ExcluirGanho(ganhoId).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
