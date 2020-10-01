using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class TipoRepositorio : RepositorioGenerico<Tipo>, ITipoRepositorio
    {
        public TipoRepositorio(Contexto contexto) : base(contexto)
        {
        }
    }
}
