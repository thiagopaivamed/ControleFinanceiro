using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFinanceiro.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ICartaoRepositorio _cartaoRepositorio;
        private readonly IGanhosRepositorio _ganhosRepositorio;
        private readonly IDespesaRepositorio _despesaRepositorio;
        private readonly IMesRepositorio _mesRepositorio;
        private readonly IGraficoRepositorio _graficoRepositorio;

        public DashboardController(ICartaoRepositorio cartaoRepositorio, IGanhosRepositorio ganhosRepositorio, IDespesaRepositorio despesaRepositorio, IMesRepositorio mesRepositorio, IGraficoRepositorio graficoRepositorio)
        {
            _cartaoRepositorio = cartaoRepositorio;
            _ganhosRepositorio = ganhosRepositorio;
            _despesaRepositorio = despesaRepositorio;
            _mesRepositorio = mesRepositorio;
            _graficoRepositorio = graficoRepositorio;
        }

        [HttpGet("PegarDadosCardsDashboard/{usuarioId}")]
        public async Task<ActionResult<DadosCardsDashboardViewModel>> PegarDadosCardsDashboard(string usuarioId)
        {
            int qtdCartoes = await _cartaoRepositorio.PegarQuantidadeCartoesPeloUsuarioId(usuarioId);
            double ganhoTotal = Math.Round(await _ganhosRepositorio.PegarGanhoTotalPeloUsuarioId(usuarioId), 2);
            double despesaTotal = Math.Round(await _despesaRepositorio.PegarDespesaTotalPorUsuarioId(usuarioId), 2);
            double saldo = Math.Round(ganhoTotal - despesaTotal, 2);

            DadosCardsDashboardViewModel model = new DadosCardsDashboardViewModel
            {
                QtdCartoes = qtdCartoes,
                GanhoTotal = ganhoTotal,
                DespesaTotal = despesaTotal,
                Saldo = saldo
            };

            return model;
        }

        [HttpGet("PegarDadosAnuaisPeloUsuarioId/{usuarioId}/{ano}")]
        public object PegarDadosAnuaisPeloUsuarioId(string usuarioId, int ano)
        {
            return (new
            {
                ganhos = _graficoRepositorio.PegarGanhosAnuaisPeloUsuarioId(usuarioId, ano),
                despesas = _graficoRepositorio.PegarDespesasAnuaisPeloUsuarioId(usuarioId, ano),
                meses = _mesRepositorio.PegarTodos()
            });
        }
    }
}
