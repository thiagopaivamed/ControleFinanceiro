using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class GanhoRepositorio : RepositorioGenerico<Ganho>, IGanhosRepositorio
    {
        private readonly Contexto _contexto;
        public GanhoRepositorio(Contexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }

        public IQueryable<Ganho> FiltrarGanhos(string nomeCategoria)
        {
            try
            {
                return _contexto.Ganhos
                    .Include(g => g.Mes).Include(g => g.Categoria)
                    .ThenInclude(g => g.Tipo)
                    .Where(g => g.Categoria.Nome.Contains(nomeCategoria) && g.Categoria.Tipo.Nome.Contains("Ganho"));
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IQueryable<Ganho> PegarGanhosPeloUsuarioId(string usuarioId)
        {
            try
            {
                return _contexto.Ganhos.Include(g => g.Mes).Include(g => g.Categoria).Where(g => g.UsuarioId == usuarioId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<double> PegarGanhoTotalPeloUsuarioId(string usuarioId)
        {
            try
            {
                return await _contexto.Ganhos.Where(g => g.UsuarioId == usuarioId).SumAsync(g => g.Valor);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
