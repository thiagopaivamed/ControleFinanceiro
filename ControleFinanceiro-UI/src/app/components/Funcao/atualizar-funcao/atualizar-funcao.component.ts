import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncoesService } from './../../../services/funcoes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizar-funcao',
  templateUrl: './atualizar-funcao.component.html',
  styleUrls: ['../listagem-funcoes/listagem-funcoes.component.css'],
})
export class AtualizarFuncaoComponent implements OnInit {
  funcaoId: string;
  nomeFuncao: string;
  formulario: any;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcoesService: FuncoesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.funcaoId = this.route.snapshot.params.id;

    this.funcoesService.PegarPeloId(this.funcaoId).subscribe((resultado) => {
      this.nomeFuncao = resultado.name;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        name: new FormControl(resultado.name, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        descricao: new FormControl(resultado.descricao, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
      });
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    this.erros = [];
    const funcao = this.formulario.value;
    this.funcoesService.AtualizarFuncao(this.funcaoId, funcao).subscribe(
      (resultado) => {
        this.router.navigate(['/funcoes/listagemfuncoes']);
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
    this.router.navigate(['/funcoes/listagemfuncoes']);
  }
}
