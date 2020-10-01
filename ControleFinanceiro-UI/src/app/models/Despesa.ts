import { Categoria } from './Categoria';
import { Cartao } from './Cartao';
import { Mes } from './Mes';
export class Despesa {
    despesaId: number;
    cartaoId: number;
    cartao: Cartao;
    descricao: string;
    categoriaId: number;
    categoria: Categoria;
    valor: number;
    dia: number;
    mesId: number;
    mes: Mes;
    ano: number;
    usuarioId: number;
}