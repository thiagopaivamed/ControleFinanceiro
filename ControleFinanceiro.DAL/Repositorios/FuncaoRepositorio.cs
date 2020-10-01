using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class FuncaoRepositorio : RepositorioGenerico<Funcao>, IFuncaoRepositorio
    {
        private readonly Contexto _contexto;
        private readonly RoleManager<Funcao> _gerenciadorFuncoes;
        public FuncaoRepositorio(Contexto contexto, RoleManager<Funcao> gerenciadorFuncoes) : base(contexto)
        {
            _contexto = contexto;
            _gerenciadorFuncoes = gerenciadorFuncoes;
        }

        public async Task AdicionarFuncao(Funcao funcao)
        {
            try
            {
                await _gerenciadorFuncoes.CreateAsync(funcao);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task AtualizarFuncao(Funcao funcao)
        {
            try
            {
                Funcao f = await PegarPeloId(funcao.Id);
                f.Name = funcao.Name;
                f.NormalizedName = funcao.NormalizedName;
                f.Descricao = funcao.Descricao;

                await _gerenciadorFuncoes.UpdateAsync(f);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IQueryable<Funcao> FiltrarFuncoes(string nomeFuncao)
        {
            try
            {
                var entity = _contexto.Funcoes.Where(f => f.Name.Contains(nomeFuncao));
                return entity;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
