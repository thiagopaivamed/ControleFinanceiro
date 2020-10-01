import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MesService } from './../../../services/mes.service';
import { CategoriasService } from './../../../services/categorias.service';
import { GanhosService } from './../../../services/ganhos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from './../../../models/Categoria';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ganho } from 'src/app/models/Ganho';
import { Mes } from 'src/app/models/Mes';

@Component({
  selector: 'app-atualizar-ganho',
  templateUrl: './atualizar-ganho.component.html',
  styleUrls: ['../listagem-ganhos/listagem-ganhos.component.css'],
})
export class AtualizarGanhoComponent implements OnInit {
  ganho: Observable<Ganho>;
  ganhoId: number;
  valorGanho: number;
  categorias: Categoria[];
  meses: Mes[];
  formulario: any;
  erros: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ganhosService: GanhosService,
    private categoriasService: CategoriasService,
    private mesesService: MesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.ganhoId = this.route.snapshot.params.id;

    this.categoriasService.FiltrarCategoriasGanhos().subscribe((resultado) => {
      this.categorias = resultado;
    });

    this.mesesService.PegarTodos().subscribe((resultado) => {
      this.meses = resultado;
    });

    this.ganhosService.PegarGanhoPeloId(this.ganhoId).subscribe((resultado) => {
      this.valorGanho = resultado.valor;

      this.formulario = new FormGroup({
        ganhoId: new FormControl(resultado.ganhoId),
        descricao: new FormControl(resultado.descricao, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        categoriaId: new FormControl(resultado.categoriaId, [
          Validators.required,
        ]),
        valor: new FormControl(resultado.valor, [Validators.required]),
        dia: new FormControl(resultado.dia, [Validators.required]),
        mesId: new FormControl(resultado.mesId, [Validators.required]),
        ano: new FormControl(resultado.ano, [Validators.required]),
        usuarioId: new FormControl(resultado.usuarioId),
      });
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const ganho = this.formulario.value;
    this.ganhosService.AtualizarGanho(this.ganhoId, ganho).subscribe(
      (resultado) => {
        this.router.navigate(['/ganhos/listagemganhos']);
        this.snackBar.open(resultado.mensagem, null, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      }
    );
  }

  VoltarListagem(): void {
    this.router.navigate(['/ganhos/listagemganhos']);
  }
}
