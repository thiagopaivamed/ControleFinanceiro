import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TiposService } from '../app/services/tipos.service';
import { CategoriasService } from './services/categorias.service';
import { FuncoesService } from './services/funcoes.service';
import { UsuariosService } from './services/usuarios.service';
import { CartoesService } from './services/cartoes.service';
import { DespesasService } from './services/despesas.service';
import { MesService } from './services/mes.service';
import { DashboardService } from './services/dashboard.service';
import { AuthGuardService } from './services/auth-guard.service';

import {
  ListagemCategoriasComponent,
  DialogExclusaoCategoriasComponent,
} from './components/Categoria/listagem-categorias/listagem-categorias.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { JwtModule } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';

import {
  ListagemFuncoesComponent,
  DialogExclusaoFuncoesComponent,
} from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';
import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './components/Dashboard/header/header.component';
import { NovoCartaoComponent } from './components/Cartao/novo-cartao/novo-cartao.component';
import {
  ListagemCartoesComponent,
  DialogExclusaoCartoesComponent,
} from './components/Cartao/listagem-cartoes/listagem-cartoes.component';
import { AtualizarCartaoComponent } from './components/Cartao/atualizar-cartao/atualizar-cartao.component';
import { NovaDespesaComponent } from './components/Despesa/nova-despesa/nova-despesa.component';
import {
  ListagemDespesasComponent,
  DialogExclusaoDespesasComponent,
} from './components/Despesa/listagem-despesas/listagem-despesas.component';
import { AtualizarDespesaComponent } from './components/Despesa/atualizar-despesa/atualizar-despesa.component';
import { NovoGanhoComponent } from './components/Ganho/novo-ganho/novo-ganho.component';
import { ListagemGanhosComponent, DialogExclusaoGanhosComponent } from './components/Ganho/listagem-ganhos/listagem-ganhos.component';
import { AtualizarGanhoComponent } from './components/Ganho/atualizar-ganho/atualizar-ganho.component';
import { AtualizarUsuarioComponent } from './components/Usuario/atualizar-usuario/atualizar-usuario.component';
import { IndexComponent } from './components/Dashboard/index/index.component';

export function PegarTokenUsuario() {
  return localStorage.getItem('TokenUsuarioLogado');
}

@NgModule({
  declarations: [
    AppComponent,
    ListagemCategoriasComponent,
    NovaCategoriaComponent,
    AtualizarCategoriaComponent,
    DialogExclusaoCategoriasComponent,
    ListagemFuncoesComponent,
    NovaFuncaoComponent,
    AtualizarFuncaoComponent,
    DialogExclusaoFuncoesComponent,
    RegistrarUsuarioComponent,
    LoginUsuarioComponent,
    DashboardComponent,
    HeaderComponent,
    NovoCartaoComponent,
    ListagemCartoesComponent,
    AtualizarCartaoComponent,
    DialogExclusaoCartoesComponent,
    NovaDespesaComponent,
    ListagemDespesasComponent,
    AtualizarDespesaComponent,
    DialogExclusaoDespesasComponent,
    NovoGanhoComponent,
    ListagemGanhosComponent,
    DialogExclusaoGanhosComponent,
    AtualizarGanhoComponent,
    AtualizarUsuarioComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule, 
    ChartsModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: PegarTokenUsuario,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    TiposService,
    CategoriasService,
    FuncoesService,
    UsuariosService,
    CartoesService,
    DespesasService,
    MesService,
    DashboardService,
    AuthGuardService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
