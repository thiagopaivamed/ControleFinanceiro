using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface ICategoriaRepositorio : IRepositorioGenerico<Categoria>
    {
        new IQueryable<Categoria> PegarTodos();

        new Task<Categoria> PegarPeloId(int id);

        IQueryable<Categoria> FiltrarCategorias(string nomeCategoria);

        IQueryable<Categoria> PegarCategoriasPeloTipo(string tipo);
    }
}
