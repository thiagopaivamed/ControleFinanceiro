using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaRepositorio _categoriaRepositorio;

        public CategoriasController(ICategoriaRepositorio categoriaRepositorio)
        {
            _categoriaRepositorio = categoriaRepositorio;
        }

        [Authorize (Roles = "Administrador")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {            
            return await _categoriaRepositorio.PegarTodos().ToListAsync();
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            var categoria = await _categoriaRepositorio.PegarPeloId(id);

            if (categoria == null)
            {
                return NotFound();
            }

            return categoria;
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.CategoriaId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _categoriaRepositorio.Atualizar(categoria);

                return Ok(new
                {
                    mensagem = $"Categoria {categoria.Nome} atualizado com sucesso"
                });
            }

            return BadRequest(ModelState);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            if (ModelState.IsValid)
            {
                await _categoriaRepositorio.Inserir(categoria);

                return Ok(new
                {
                    mensagem = $"Categoria {categoria.Nome} cadastrada com sucesso"
                });
            }

            return BadRequest(categoria);
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categoria>> DeleteCategoria(int id)
        {
            var categoria = await _categoriaRepositorio.PegarPeloId(id);
            if (categoria == null)
            {
                return NotFound();
            }

            await _categoriaRepositorio.Excluir(id);

            return Ok(new
            {
                mensagem = $"Categoria {categoria.Nome} excluída com sucesso"
            });
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("FiltrarCategorias/{nomeCategoria}")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategorias(string nomecategoria)
        {
            return await _categoriaRepositorio.FiltrarCategorias(nomecategoria).ToListAsync();
        }

        [Authorize]
        [HttpGet("FiltrarCategoriasDespesas")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasDespesas()
        {
            return await _categoriaRepositorio.PegarCategoriasPeloTipo("Despesa").ToListAsync();
        }

        [Authorize]
        [HttpGet("FiltrarCategoriasGanhos")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasGanhos()
        {
            return await _categoriaRepositorio.PegarCategoriasPeloTipo("Ganho").ToListAsync();
        }
    }
}
