import { AtualizarUsuario } from './../../../models/AtualizarUsuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from './../../../services/usuarios.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css'],
})
export class AtualizarUsuarioComponent implements OnInit {
  formulario: any;
  usuarioId: string = localStorage.getItem('UsuarioId');
  emailUsuario: string;
  urlFoto: SafeResourceUrl;
  foto: File = null;
  fotoAnterior: File = null;
  erros: string[];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.usuariosService
      .RetornarFotoUsuario(this.usuarioId)
      .subscribe((resultado) => {
        this.fotoAnterior = resultado.imagem;
        this.urlFoto = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + resultado.imagem
        );
      });

    this.usuariosService
      .PegarUsuarioPeloId(this.usuarioId)
      .subscribe((resultado) => {
        this.emailUsuario = resultado.email;

        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          username: new FormControl(resultado.userName, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ]),
          email: new FormControl(resultado.email, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
            Validators.email,
          ]),
          cpf: new FormControl(resultado.cpf, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ]),
          profissao: new FormControl(resultado.profissao, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30),
          ]),
          foto: new FormControl(null),
        });
      });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  SelecionarFoto(fileInput: any): void {
    this.foto = fileInput.target.files[0] as File;

    const reader = new FileReader();

    reader.onload = function (e: any) {
      document.getElementById('foto').removeAttribute('hidden');
      document.getElementById('foto').setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(this.foto);
  }

  EnviarFormulario(): void {
    const dados = this.formulario.value;

    if (this.foto != null) {
      const formData: FormData = new FormData();
      formData.append('file', this.foto, this.foto.name);

      this.usuariosService.SalvarFoto(formData).subscribe(
        (resultado) => {
          const atualizarUsuario: AtualizarUsuario = new AtualizarUsuario();
          atualizarUsuario.id = dados.id;
          atualizarUsuario.userName = dados.username;
          atualizarUsuario.cpf = dados.cpf;
          atualizarUsuario.email = dados.email;
          atualizarUsuario.profissao = dados.profissao;
          atualizarUsuario.foto = resultado.foto;

          this.usuariosService.AtualizarUsuario(atualizarUsuario).subscribe(
            (resposta) => {
              this.router.navigate(['/dashboard/index']);
              this.snackBar.open(resposta.mensagem, null, {
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
        },

        (err) => {
          if (err.status === 400) {
            for (const campo in err.error.errors) {
              if (err.error.errors.hasOwnProperty(campo)) {
                this.erros.push(err.error.errors[campo]);
              }
            }
          }
          if (err.status === 500) {
            this.erros.push('Erro ao tentar salvar a foto');
          }
        }
      );
    } else {
      const atualizarUsuario: AtualizarUsuario = new AtualizarUsuario();
      atualizarUsuario.id = dados.id;
      atualizarUsuario.userName = dados.username;
      atualizarUsuario.cpf = dados.cpf;
      atualizarUsuario.email = dados.email;
      atualizarUsuario.profissao = dados.profissao;
      atualizarUsuario.foto = this.fotoAnterior;

      this.usuariosService.AtualizarUsuario(atualizarUsuario).subscribe(
        (resposta) => {
          this.router.navigate(['/dashboard/index']);
          this.snackBar.open(resposta.mensagem, null, {
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
  }

  Voltar(): void {
    this.router.navigate(['/dashboard/index']);
  }
}
