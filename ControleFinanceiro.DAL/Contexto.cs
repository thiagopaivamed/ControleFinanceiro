using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Mapeamentos;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ControleFinanceiro.DAL
{
    public class Contexto : IdentityDbContext<Usuario, Funcao, string>
    {
        public DbSet<Cartao> Cartoes { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Despesa> Despesas { get; set; }
        public DbSet<Funcao> Funcoes { get; set; }
        public DbSet<Ganho> Ganhos { get; set; }
        public DbSet<Mes> Meses { get; set; }
        public DbSet<Tipo> Tipos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new CartaoMap());
            builder.ApplyConfiguration(new CategoriaMap());
            builder.ApplyConfiguration(new DespesaMap());
            builder.ApplyConfiguration(new FuncaoMap());
            builder.ApplyConfiguration(new GanhoMap());
            builder.ApplyConfiguration(new MesMap());
            builder.ApplyConfiguration(new TipoMap());
            builder.ApplyConfiguration(new UsuarioMap());
        }
    }
}
