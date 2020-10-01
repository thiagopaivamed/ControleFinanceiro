using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface ICartaoRepositorio : IRepositorioGenerico<Cartao>
    {
        IQueryable<Cartao> PegarCartoesPeloUsuarioId(string usuarioId);

        IQueryable<Cartao> FiltrarCartoes(string numeroCartao);

        Task<int> PegarQuantidadeCartoesPeloUsuarioId(string usuarioId);
    }
}
