import { Mes } from './Mes';
import { Categoria } from './Categoria';

export class Ganho {
  ganhoId: number;
  descricao: string;
  categoriaId: number;
  categoria: Categoria;
  valor: number;
  dia: number;
  mesId: number;
  mes: Mes;
  ano: number;
  usuarioId: string;
}
